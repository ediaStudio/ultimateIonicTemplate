import {Injectable} from '@angular/core';
import {AlertController, LoadingController, ToastController} from "@ionic/angular";
import {ELang, LANGUAGES} from "@models/language";
import {TranslateService} from "@ngx-translate/core";
import {EToastPosition} from "@models/general";

@Injectable({
    providedIn: 'root'
})
export class MiscService {

    toast: any;
    loading: any;

    constructor(private alertController: AlertController,
                private toastController: ToastController,
                private loadingController: LoadingController,
                private translate: TranslateService) {
    }


    async presentLoadingWithOptions(message: string = 'pleaseWait') {
        this.dismissLoading();
        this.loading = await this.loadingController.create({
            spinner: "bubbles",
            duration: 10000,
            message: this.translate.instant(message),
            translucent: false,
            showBackdrop: true,
            cssClass: 'custom-class custom-loading'
        });
        return await this.loading.present();
    }

    async presentAlertUpdate(): Promise<boolean> {
        //@ts-ignore
        return new Promise(async (resolve, reject) => {
            const alert = await this.alertController.create({
                backdropDismiss: false,
                header: this.translate.instant('updateAvailable'),
                message: this.translate.instant('pleaseUpdateTheApp'),
                buttons: [{
                    text: this.translate.instant('ok'),
                    handler: () => {
                        resolve(true);
                    }
                }]
            });

            alert.present();
        })
    }


    gainCredits(headerCode: string): Promise<any> {

        return new Promise(async (resolve, reject) => {
            const alert = await this.alertController.create({
                backdropDismiss: true,
                header: this.translate.instant(headerCode),
                buttons: [{
                    text: this.translate.instant('notNow'),
                    handler: () => {
                        reject(false);
                    }
                }, {
                    text: this.translate.instant('ok'),
                    handler: () => {
                        resolve(true);
                    }
                }]
            });

            alert.present();
        })
    }


    async presentAlertLanguage(): Promise<ELang> {
        //@ts-ignore
        return new Promise(async (resolve, reject) => {

            const alert = await this.alertController.create({
                backdropDismiss: true,
                header: 'Languages',
                subHeader: 'Select a language',
                inputs: LANGUAGES as any,
                buttons: [{
                    text: 'Cancel',
                    handler: () => {
                        reject();
                    }
                }, {
                    text: 'Select',
                    handler: (data) => {
                        resolve(data);
                    }
                }]
            });

            alert.present();
        })
    }

    async presentToastWithOptions(headerCode: any, isError: boolean, position?: EToastPosition) {
        if (this.toast) {
            this.toast.dismiss();
        }
        headerCode = headerCode?.message || headerCode;
        headerCode = headerCode ? headerCode : isError ? 'error' : 'unknown';
        this.toast = await this.toastController.create({
            header: this.translate.instant(headerCode),
            // message: 'Click to Close',
            position: position || EToastPosition.BOTTOM,
            animated: true,
            cssClass: 'my-toast',
            color: isError ? "danger" : "medium",
            duration: 1800,
            keyboardClose: false,
            translucent: false
        });
        this.toast.present();
    }


    dismissLoading() {
        if (this.loading) {
            this.loading.dismiss();
        }
    }

    displayError(error?: any, dismissLoading = true) {
        const message = error?.message || JSON.stringify(error) || 'error';
        if (dismissLoading) {
            this.dismissLoading();
        }
        if (!error) {
            return;
        }
        this.presentToastWithOptions(message, true, EToastPosition.MIDDLE);
    }

    async presentNotificationAlert(header = 'alert',
                                   subHeader = '',
                                   message: string,
                                   backdropDismiss = true,
                                   cssClass = ''): Promise<any> {
        if (!message) {
            return;
        }

        console.log(message);
        try {
            const notificationAlert = await this.alertController.create({
                backdropDismiss,
                translucent: false,
                header,
                subHeader,
                message: message,
                cssClass,
                buttons: [{
                    text: this.translate.instant('ok'),
                    handler: () => {
                    }
                }]
            });

            await notificationAlert.present();
        } catch (e: any) {
            console.error(e);
        }
    }


}
