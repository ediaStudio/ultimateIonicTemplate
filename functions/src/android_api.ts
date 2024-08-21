import {functions} from "./firebaseInit";
import {google} from 'googleapis';
import {EPurchaseProducts} from "@models/transaction";
import {EFunctionsErrorCode} from "@models/general";
import {PACKAGE} from "@models/appInfo";

// https://www.npmjs.com/package/googleapis
const authClient = new google.auth.JWT({
    keyFile: 'src/files/infinity-quiz-431911-00b4571fc53b.json',
    scopes: ["https://www.googleapis.com/auth/androidpublisher"]
});

const playDeveloperApiClient = google.androidpublisher({
    version: 'v3',
    auth: authClient
});

export async function testPurchase(subToken?: string, productToken?: string) {

    try {
        let product: any;
        await authClient.authorize();
        // https://developers.google.com/android-publisher/api-ref/rest/v3/purchases.subscriptions
        // if (subToken) {
        //    const subscription = await getSubscription("subscriptionId", subToken);
        // }
        if (productToken) {
            product = await getProductAndroid(EPurchaseProducts.credits1Android, productToken);
        }

        return {
            product
        };

    } catch (error) {
        // Logging error for debugging
        console.log(error)
    }

    return;
}


export async function getProductAndroid(productId: EPurchaseProducts, token: string) {
    try {
        // https://developers.google.com/android-publisher/api-ref/rest/v3/purchases.products
        const res = await playDeveloperApiClient.purchases.products.get({
            packageName: PACKAGE,
            productId,
            token
        });
        console.log(res);

        if (res.status === 200) {
            return res.data;
        }
    } catch (error: any) {
        // Logging error for debugging
        console.log(error)
        throw new functions.https.HttpsError(
            EFunctionsErrorCode.UNKNOW, error?.message);
    }

    return;
}

// If you have subscription in your app
// export async function getSubscription(subscriptionId: EPurchaseProducts, token: string) {
//     try {
//         // https://developers.google.com/android-publisher/api-ref/rest/v3/purchases.subscriptions
//         const subscription = await playDeveloperApiClient.purchases.subscriptions.get({
//             packageName: PACKAGE,
//             subscriptionId,
//             token
//         });
//         console.log(subscription.status);
//         console.log(subscription.data);
//
//         if (subscription.status === 200) {
//             return subscription.data;
//         }
//     } catch (error: any) {
//         // Logging error for debugging
//         console.log(error)
//         throw new functions.https.HttpsError(
//             FUNCTIONS_ERROR_CODE.UNKNOW, error?.message);
//     }
//
//     return;
// }
//
//
// export async function manageSubscriptionAndroid(playerId: string,
//                                                 subscriptionId: EPurchaseProducts,
//                                                 purchaseToken: string,
//                                                 lastBonusReceived = 0) {
//     try {
//         const subscription = await getSubscription(subscriptionId, purchaseToken);
//
//         const expiryTimeMillis = subscription?.expiryTimeMillis ?
//             parseInt(subscription?.expiryTimeMillis) : 0;
//         const now = Date.now();
//         const isPremium = now < expiryTimeMillis;
//
//         const paymentState = subscription?.paymentState;
//
//         // The payment state of the subscription. Possible values are:
//         // 0. Payment pending
//         // 1. Payment received
//         // 2. Free trial
//         // 3. Pending deferred upgrade/downgrade
//         let dataToUpdate: IUser = {
//             isPremium,
//             androidExpiryTimeMillis: expiryTimeMillis
//         } as IUser;
//         if (!lastBonusReceived && (paymentState === 1 || paymentState === 2)) {
//             dataToUpdate = {
//                 ...dataToUpdate,
//                 credits: FieldValue.increment(EPurchaseAmount.credits4),
//                 hints: FieldValue.increment(getAmountByHintId(EHintsId.hints4)),
//                 androidSubscriptionId: subscriptionId,
//                 androidPurchaseToken: purchaseToken,
//                 androidLastBonusReceived: now
//             } as any
//         } else if (lastBonusReceived) {
//             // TODO
//             // one month
//             const periodMillis = 30 * 24 * 60 * 60 * 1000;
//             // 5 min
//             // const periodMillis = 5 * 60 * 1000;
//             // 30 min
//             // const periodMillis = 30 * 60 * 1000;
//
//             const timeSinceLastBonus = now < expiryTimeMillis ?
//                 now - lastBonusReceived : expiryTimeMillis - lastBonusReceived;
//             const periodsSinceLastBonus = Math.floor(timeSinceLastBonus / periodMillis);
//
//             //const period = testGoogleSubMonthly(expiryTimeMillis - lastBonusReceived);
//             // const period = countMonthsFromMilliseconds(expiryTimeMillis - lastBonusReceived);
//             // if period < 1 we do nothing
//             if (periodsSinceLastBonus >= 1) {
//                 dataToUpdate = {
//                     ...dataToUpdate,
//                     credits: FieldValue.increment(periodsSinceLastBonus * EPurchaseAmount.credits4),
//                     hints: FieldValue.increment(periodsSinceLastBonus * getAmountByHintId(EHintsId.hints4)),
//                     androidLastBonusReceived: now
//                 } as any
//             }
//         }
//         await updateUser(playerId, dataToUpdate)
//
//     } catch (error: any) {
//         functions.logger.error(error);
//         throw new functions.https.HttpsError(
//             FUNCTIONS_ERROR_CODE.UNKNOW, error?.details);
//     }
// }
