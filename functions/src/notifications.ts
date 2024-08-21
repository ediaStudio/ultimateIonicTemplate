import {ENotificationType, INotificationsParams} from "./models/notifications";
import {Message} from "firebase-admin/lib/messaging/messaging-api";
import {ONE_DAY_MS, REGION} from "./models/general";
import {admin, functions} from "./firebaseInit";
import {IUser} from "./models/user";
import {getRewardsReady, updateUser} from "./users";

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
