// Saves a message to the Firebase Realtime Database but sanitizes the
// text by removing swearwords.
import {admin, functions} from "./firebaseInit";
import {ECollection, EFunctionsErrorCode, ONE_DAY_MS, REGION} from "@models/general";
import {ELang} from "@models/language";
import {IUser} from "@models/user";
import {FieldValue} from 'firebase-admin/firestore';
import {DAILY_REWARD_CREDITS} from "@models/transaction";
import {firestoreDocsToArray} from "@helpers/misc.helpers";

export const setUserCall = functions.region(REGION)
    .https.onCall(async (data: any, context) => {

        console.log("token", context?.auth?.token);
        const uid = context?.auth?.uid;
        // Checking that the user is authenticated.
        if (!uid) {
            // Throwing an HttpsError so that the client gets the error details.
            throw new functions.https.HttpsError(
                EFunctionsErrorCode.UNAUTHENTICATED, `The function must be called while authenticated.`);
        }

        const lang = data?.lang || ELang.en;

        try {
            const user = await getUserByUid(uid);

            const now = Date.now();
            if (user) {
                await updateUser(uid, {
                    updated: now,
                    lang
                } as IUser)
            } else {

                const user: IUser = {
                    created: now,
                    updated: now,
                    lang,
                    credits: 1,
                    dailyNotificationSent: false,
                    notificationTokens: [],
                    lastDailyRewardCreditsTimestamp: 0,
                    userId: uid
                }
                console.log(user);

                await setNewUser(uid, user);
            }


            return;
        } catch (error: any) {
            functions.logger.error(error);
            throw new functions.https.HttpsError(
                EFunctionsErrorCode.UNKNOW, error?.message);
        }
    });

export const getDailyRewardCall = functions.region(REGION).runWith({
    memory: "256MB",
    timeoutSeconds: 60,
    minInstances: 0,
})
    .https.onCall(async (data: any, context) => {

        console.log("token", context?.auth?.token);
        const uid = context?.auth?.uid;
        // Checking that the user is authenticated.
        if (!uid) {
            // Throwing an HttpsError so that the client gets the error details.
            throw new functions.https.HttpsError(
                EFunctionsErrorCode.UNAUTHENTICATED, `The function must be called while authenticated.`);
        }


        try {
            const user = await getUserByUid(uid);
            if (!user?.documentId) {
                return;
            }
            const now = Date.now();
            const creditsTimestamp = user.lastDailyRewardCreditsTimestamp || 0;
            if (now > (creditsTimestamp + ONE_DAY_MS)) {
                await updateUser(user.documentId, {
                    lastDailyRewardCreditsTimestamp: now,
                    credits: FieldValue.increment(DAILY_REWARD_CREDITS),
                    dailyNotificationSent: false
                } as any as IUser)
            }


            return;

        } catch (error: any) {
            functions.logger.error(error);
            throw new functions.https.HttpsError(
                EFunctionsErrorCode.UNKNOW, error?.message);
        }
    });

export const updateUserTokenCall = functions.region(REGION)
    .https.onCall(async (data: { token: string }, context) => {

        const uid = context?.auth?.uid;
        // Checking that the user is authenticated.
        if (!uid) {
            // Throwing an HttpsError so that the client gets the error details.
            throw new functions.https.HttpsError(
                EFunctionsErrorCode.UNAUTHENTICATED, `The function must be called while authenticated.`);
        }

        const token = data?.token || "";

        if (!token) {
            return;
        }

        try {
            const user = await getUserByUid(uid);
            if (!user?.documentId) {
                return;
            }

            const notificationTokens = user.notificationTokens || [];
            if (!notificationTokens?.includes(token)) {
                // if same user use multiple device we need to do arrayUnion
                await updateUser(user.documentId, {
                    notificationTokens: [token]
                } as any as IUser)
            }

            return;

        } catch (error: any) {
            functions.logger.error(error);
            throw new functions.https.HttpsError(
                error?.code, error?.message);
        }
    });


export async function getUserByUid(userId: string): Promise<IUser | undefined> {
    try {
        const res = await admin.firestore().collection(ECollection.users)
            .doc(userId)
            .get();
        if (res?.exists) {
            const user = res.data() as IUser;
            user.documentId = res.id;
            return user;
        }
    } catch (error: any) {
        functions.logger.error(error);
    }

    return;
}

export async function setNewUser(userId: string, user: IUser): Promise<IUser> {
    try {
        await admin.firestore().collection(ECollection.users)
            .doc(userId)
            .set(user);
    } catch (error: any) {
        functions.logger.error(error);
        throw new functions.https.HttpsError(
            EFunctionsErrorCode
                .UNKNOW, error?.details);
    }

    return user;
}

export async function updateUser(userId: string, user: IUser): Promise<void> {
    user.updated = Date.now();
    try {
        await admin.firestore().collection(ECollection.users)
            .doc(userId)
            .update(user as any);
    } catch (error: any) {
        functions.logger.error(error);
        throw new functions.https.HttpsError(
            EFunctionsErrorCode
                .UNKNOW, error?.details);
    }
}

export async function getRewardsReady(timestamp: number): Promise<IUser[]> {
    console.log("getRewardsReady", timestamp);
    try {
        const res = await admin.firestore().collection(ECollection.users)
            .where("dailyNotificationSent", "==", false)
            .where("lastDailyRewardCreditsTimestamp", "<=", timestamp)
            .orderBy("lastDailyRewardCreditsTimestamp", "asc").get();
        if (!res?.empty) {
            return firestoreDocsToArray(res.docs)
        }
    } catch (error: any) {
        functions.logger.error(error);
    }

    return [];
}
