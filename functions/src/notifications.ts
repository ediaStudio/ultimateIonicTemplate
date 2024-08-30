import {ENotificationType, INotificationsParams} from "./models/notifications";
import {Message} from "firebase-admin/lib/messaging/messaging-api";
import {EFunctionsErrorCode, ONE_DAY_MS, REGION} from "./models/general";
import {admin, functions} from "./firebaseInit";
import {IUser} from "./models/user";
import {getRewardsReady, getUserByUid, updateUser} from "./users";

// https://capacitorjs.com/docs/apis/push-notifications
// https://firebase.google.com/docs/functions/pubsub-events?gen=1st
// https://crontab.guru/

// To test your cron job on google cloud
// select your project on top left, then click on 3 vertical arrow
// Then Force run
// https://console.cloud.google.com/cloudscheduler
export const checkNotification = functions.region(REGION)
    .pubsub.schedule('0 19 * * *').onRun(async (context) => {
        try {
            await sendDailyNotifications();
        } catch (e: any) {
            console.error(e);
        }
        return;
    });

export const testNotificationCall = functions.region(REGION)
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

            if (user?.notificationTokens?.length) {
                await sendNotification(ENotificationType.test, user.notificationTokens);
            } else {
                throw new functions.https.HttpsError(
                    EFunctionsErrorCode.FAILED_PRECONDITION, `Notification token is missing`);
            }


            return;
        } catch (error: any) {
            functions.logger.error(error);
            throw new functions.https.HttpsError(
                EFunctionsErrorCode.UNKNOW, error?.message);
        }
    });


export async function sendDailyNotifications() {
    try {
        const now = Date.now();
        const limit = now - ONE_DAY_MS;
        const creditsReady = await getRewardsReady(limit);
        console.log("toSend", creditsReady);
        let tokens: string[] = [];
        const allPromises: any[] = [];
        for (const u of creditsReady) {
            const notificationTokens = u?.notificationTokens || [];
            if (u?.documentId && notificationTokens?.length) {
                tokens = tokens.concat(notificationTokens);
                allPromises.push(updateUser(u.documentId, {
                    dailyNotificationSent: true
                } as IUser))
            }
        }
        await Promise.all(allPromises);

        await sendNotification(ENotificationType.dailyRewards, tokens);
    } catch (e: any) {
        console.error(e);
    }
}

export async function sendNotification(type: ENotificationType, tokens: string[], params?: INotificationsParams) {
    if (!tokens || !tokens?.length) {
        return;
    }
    try {
        const allMessages: Message[] = [];
        // TODO change the title of the notification here
        let title = "Infinity Quiz";
        let body = '';
        const link = "";
        switch (type) {
            case ENotificationType.dailyRewards:
                title = 'Rewards available !';
                body = `You free credits are ready 🥳`;
                break;
            case ENotificationType.test:
                title = 'Test Notification';
                body = `Notification is working`;
                break;
        }
        for (const t of tokens) {
            const message: Message = {
                data: {
                    link,
                    type,
                },
                notification: {
                    title,
                    body
                },
                token: t
            };
            allMessages.push(message);
        }

        await admin.messaging().sendEach(allMessages);
    } catch (e: any) {
        console.error(e);
    }
}
