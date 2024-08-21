import {Injectable} from '@angular/core';
import {ActionPerformed, PushNotifications, PushNotificationSchema, Token} from "@capacitor/push-notifications";
import {ENotificationType} from "@models/notifications";
import {UserService} from "@services/user.service";
import {MiscService} from "@services/misc.service";

// https://capacitorjs.com/docs/guides/push-notifications-firebase
@Injectable({
    providedIn: 'root'
})
export class NotificationsService {

    constructor(
        private userService: UserService,
        private miscService: MiscService
    ) {
    }

    async manageNotifications() {
        try {
            // Request permission to use push notifications
            // iOS will prompt user and return if they granted permission or not
            // Android will just grant without prompting
            let permStatus = await PushNotifications.checkPermissions();

            if (permStatus.receive === 'prompt') {
                permStatus = await PushNotifications.requestPermissions();
            }

            if (permStatus.receive !== 'granted') {
                throw new Error('User denied permissions!');
                return;
            }

            await PushNotifications.register();

            // On success, we should be able to receive notifications
            PushNotifications.addListener('registration',
                (token: Token) => {
                    if (token?.value) {
                        console.log('Push registration success, token: ' + token.value);
                        this.userService.updateUserTokenCall(token.value);
                    }
                }
            );

            // Some issue with our setup and push will not work
            PushNotifications.addListener('registrationError',
                (error: any) => {
                    console.error('Error on registration: ' + JSON.stringify(error));
                }
            );

            // Show us the notification payload if the app is open on our device
            PushNotifications.addListener('pushNotificationReceived',
                (notification: PushNotificationSchema) => {
                    console.log('Push received: ' + JSON.stringify(notification));
                    const title = notification?.title || "";
                    const subtitle = notification?.subtitle || "";
                    const body = notification?.body;
                    // les daily rewards s'affiche dans les notif du telephone deja
                    const type = notification?.data?.type as ENotificationType;
                    if (type !== ENotificationType.dailyRewards && body) {
                        this.miscService.presentNotificationAlert(title, subtitle, body, false);
                    }
                }
            );

            // Method called when tapping on a notification
            PushNotifications.addListener('pushNotificationActionPerformed',
                (notification: ActionPerformed) => {
                    console.log('Push action performed: ' + JSON.stringify(notification));
                }
            );
        } catch (e: any) {
            console.error(e)
        }

    }

}
