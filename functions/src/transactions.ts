import {admin, functions} from "./firebaseInit";
import {
    EIOSOwnership,
    EPurchaseAmount,
    EPurchaseProducts,
    ETransactionPlatform,
    ITransaction
} from "@models/transaction";
import {ECollection, EFunctionsErrorCode, REGION} from "@models/general";
import {getUserByUid, updateUser} from "./users";
import {FieldValue} from 'firebase-admin/firestore';
import {IUser} from "@models/user";
import {getProductAndroid} from "./android_api";
import {getTransactionInfo} from "./ios_api";

export const saveTransaction = functions.region(REGION).runWith({
    memory: "256MB",
    timeoutSeconds: 60,
    minInstances: 1,
})
    .https.onCall(async (data: ITransaction, context) => {

        const uid = context?.auth?.uid;
        // Checking that the user is authenticated.
        if (!uid) {
            // Throwing an HttpsError so that the client gets the error details.
            throw new functions.https.HttpsError(
                EFunctionsErrorCode.UNAUTHENTICATED, `The function must be called while authenticated.`);
        }

        const products = data?.products;
        if (!products?.length) {
            throw new functions.https.HttpsError(
                EFunctionsErrorCode.FAILED_PRECONDITION, `No products`);
        }

        try {

            // only on ios make a call when app start
            // if (data?.productId === EPurchaseProducts.iosInitPurchase) {
            //     return;
            // }
            const user = await getUserByUid(uid);
            if (!user?.documentId) {
                return;
            }

            data.userId = uid;
            await addTransaction(data);

            return;
        } catch (error: any) {
            functions.logger.error(error);
            throw new functions.https.HttpsError(
                error?.status, error?.message);
        }
    });


export const transactionOnCreate = functions.region(REGION).runWith({
    memory: "256MB",
    timeoutSeconds: 60,
    minInstances: 1,
})
    .firestore.document(`${ECollection.transactions}/{documentId}`)
    .onCreate(async (snap, context) => {

        try {
            const transaction: ITransaction = snap.data() as ITransaction;
            console.log("transaction", transaction);

            const userId = transaction?.userId;
            if (!userId) {
                throw new functions.https.HttpsError(
                    EFunctionsErrorCode.NOT_FOUND, `playerId ${userId} not found for transactionId ${transaction?.transactionId}`);
            }

            const productId = transaction?.productId;
            if (!productId) {
                throw new functions.https.HttpsError(
                    EFunctionsErrorCode.FAILED_PRECONDITION, `productId ${productId} do not exist for purchaseId ${transaction?.purchaseId}`);
            }

            const user = await getUserByUid(userId);
            if (!user) {
                throw new functions.https.HttpsError(
                    EFunctionsErrorCode.NOT_FOUND, `user ${userId} do not exist`);
            }
            const platform = transaction.platform;
            if (platform === ETransactionPlatform.APPLE_APPSTORE) {
                const transactionId = transaction?.transactionId;
                if (!transactionId) {
                    throw new functions.https.HttpsError(
                        EFunctionsErrorCode.FAILED_PRECONDITION, `transactionId ${transactionId} do not exist`);
                }

                await managePurchase(userId, productId, transactionId, platform);

            } else if (platform === ETransactionPlatform.GOOGLE_PLAY) {
                const purchaseToken = transaction?.purchaseId;
                if (!purchaseToken) {
                    throw new functions.https.HttpsError(
                        EFunctionsErrorCode.FAILED_PRECONDITION, `purchaseId ${purchaseToken} do not exist for purchaseId ${transaction?.purchaseId}`);
                }

                await managePurchase(userId, productId, purchaseToken, platform);
            }

            return;
        } catch (error: any) {
            console.log(`Error => ${error}`);
            throw new functions.https.HttpsError(
                EFunctionsErrorCode.UNKNOW, error?.message);
        }
    })

async function addTransaction(transaction: ITransaction): Promise<any> {
    try {
        transaction.created = Date.now();
        await admin.firestore().collection(ECollection.transactions)
            .add(transaction);
    } catch (error: any) {
        functions.logger.error(error);
        throw new functions.https.HttpsError(
            error?.status, error?.message);
    }
}


// export async function getTransactionByPurchaseToken(purchaseToken: string): Promise<ITransaction | undefined> {
//     if (!purchaseToken) {
//         return;
//     }
//     try {
//         const res = await admin.firestore().collection(ECollections.transactions)
//             .where("purchaseId", "==", purchaseToken)
//             .orderBy("created", "desc")
//             .get();
//         if (!res?.empty) {
//             const docs = firestoreDocsToArray(res.docs);
//             return docs[0] as ITransaction;
//         }
//     } catch (error: any) {
//         functions.logger.error(error);
//         throw new functions.https.HttpsError(
//             FUNCTIONS_ERROR_CODE.UNKNOW, error?.details);
//     }
//
//     return;
// }

export async function managePurchase(userId: string,
                                     productId: EPurchaseProducts,
                                     purchaseToken: string, platform: ETransactionPlatform) {
    try {
        if (platform === ETransactionPlatform.GOOGLE_PLAY) {
            const product = await getProductAndroid(productId, purchaseToken);
            if (product?.purchaseState !== 0) {
                return;
            }
        } else if (platform === ETransactionPlatform.APPLE_APPSTORE) {
            // TODO
            const transactionInfo = await getTransactionInfo(purchaseToken);
            if (!transactionInfo || transactionInfo?.inAppOwnershipType !== EIOSOwnership.PURCHASED) {
                return;
            }
        }

        switch (productId) {
            case EPurchaseProducts.credits1Android:
            case EPurchaseProducts.credits1IOS:
                await updateUser(userId, {
                    credits: FieldValue.increment(EPurchaseAmount.credits1)
                } as any as IUser)
                break;

        }
    } catch (error: any) {
        functions.logger.error(error);
        throw new functions.https.HttpsError(
            EFunctionsErrorCode.UNKNOW, error?.details);
    }
}


