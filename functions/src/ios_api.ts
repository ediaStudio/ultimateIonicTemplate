import {AppStoreServerAPIClient, Environment, SendTestNotificationResponse} from "@apple/app-store-server-library"
import {IOS_PRIVATE_KEY} from "./files/apple_private_key";
import {decode} from 'jsonwebtoken';
import {PACKAGE} from "@models/appInfo";
import {ITransactionIOS} from "@models/transaction";

// https://github.com/apple/app-store-server-library-node
// https://appstoreconnect.apple.com/access/integrations/api/subs
const issuerId = "561c3c09-e608-406e-86a9-818ce8d424b3";
const keyId = "HD9ZRUSHXN";
const bundleId = PACKAGE;
// inside SubscriptionKey_HD9ZRUSHXN.p8
const encodedKey = IOS_PRIVATE_KEY;

const clientProd = new AppStoreServerAPIClient(encodedKey, keyId, issuerId, bundleId, Environment.PRODUCTION);
const clientDev = new AppStoreServerAPIClient(encodedKey, keyId, issuerId, bundleId, Environment.SANDBOX);

export async function testIOSServer() {

    try {
        const response: SendTestNotificationResponse = await clientProd.requestTestNotification()
        console.log(response);
    } catch (e) {
        console.error(e)
    }
}

export async function getTransactionInfo(transactionId: string): Promise<ITransactionIOS | undefined> {

    try {
        const response = await clientProd.getTransactionInfo(transactionId)
        console.log("transaction", response);
        const token = response?.signedTransactionInfo;
        if (token) {
            const decoded = decode(token);
            console.log(decoded);
            return decoded as ITransactionIOS;
        }
    } catch (e) {
        console.error(e)
        return await getTransactionInfoSandbox(transactionId);
    }
    return;
}

export async function getTransactionInfoSandbox(transactionId: string, isProd = true): Promise<ITransactionIOS | undefined> {

    try {
        const response = await clientDev.getTransactionInfo(transactionId)
        console.log("transaction", response);
        const token = response?.signedTransactionInfo;
        if (token) {
            const decoded = decode(token);
            console.log(decoded);
            return decoded as ITransactionIOS;
        }
    } catch (e) {
        console.error(e);
    }
    return;
}


// for ios a new transaction is made for every period
// but we need to go on purchase page in front to load it
// export async function manageSubscriptionIOS(playerId: string,
//                                             transactionId: string) {
//     try {
//         const transactionInfo = await getTransactionInfo(transactionId);
//
//         if (transactionInfo?.expiresDate) {
//
//             const dataToUpdate = {
//                 credits: FieldValue.increment(EPurchaseAmount.credits4),
//                 hints: FieldValue.increment(getAmountByHintId(EHintsId.hints4))
//             } as any;
//
//             await updateUser(playerId, dataToUpdate)
//
//             const userRef = admin.firestore().collection(ECollections.users)
//                 .doc(playerId);
//
//             const iosExpiresDateMs: number = transactionInfo?.expiresDate || 0;
//             console.log(iosExpiresDateMs);
//
//             await admin.firestore().runTransaction(async (t) => {
//
//                 const doc = await t.get(userRef);
//                 if (doc?.exists) {
//                     const user = doc.data() as IUser;
//                     const currentIosExpiresDateMs = user?.iosExpiresDateMs || 0;
//                     if (iosExpiresDateMs > currentIosExpiresDateMs) {
//                         const now = Date.now();
//                         const isPremium = now < iosExpiresDateMs;
//                         t.update(userRef, {
//                             updated: now,
//                             isPremium,
//                             iosExpiresDateMs,
//                             iosTransactionId: transactionInfo?.transactionId || ""
//                         } as any);
//                         return `New iosTransactionId: ${transactionInfo?.transactionId}`;
//                     } else {
//                         throw `iosExpiresDateMs: ${iosExpiresDateMs} is higher than currentIosExpiresDateMs: ${currentIosExpiresDateMs}`;
//                         return;
//                     }
//                 } else {
//                     throw `User do not exist: ${playerId}`;
//                     return;
//                 }
//             });
//         }
//
//     } catch (error: any) {
//         functions.logger.error(error);
//         throw new functions.https.HttpsError(
//             FUNCTIONS_ERROR_CODE.UNKNOW, error?.details);
//     }
// }
//
// // ONLY FOR TEST
// export async function manageSubscriptionIOSTest(playerId: string, value: number) {
//     try {
//         const userRef = admin.firestore().collection(ECollection.users)
//             .doc(playerId);
//
//         await admin.firestore().runTransaction(async (t) => {
//
//             const doc = await t.get(userRef);
//             console.log(doc);
//             if (doc?.exists) {
//                 const user = doc.data() as any;
//                 const currentAAA = user?.aaa || 0;
//                 if (value > currentAAA) {
//                     t.update(userRef, {
//                         aaa: value
//                     } as any);
//                     return `New aaa: ${value}`;
//                 } else {
//                     throw `value: ${value} is higher than currentAAA: ${currentAAA}`;
//                 }
//             } else {
//                 throw `User do not exist: ${playerId}`;
//                 return;
//             }
//         });
//
//     } catch (error: any) {
//         functions.logger.error(error);
//         throw new functions.https.HttpsError(
//             FUNCTIONS_ERROR_CODE.UNKNOW, error?.details);
//     }
// }
