import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {ELang} from "@models/language";
import {MiscService} from "@services/misc.service";
import {Preferences} from "@capacitor/preferences";
import {
    darkStorage,
    ECollection,
    EMULATORS_PORT,
    EPlatform,
    EToastPosition,
    langStorage,
    rateUsStorage,
    REGION
} from "@models/general";
import {InAppReview} from "@capacitor-community/in-app-review";
import {Capacitor} from "@capacitor/core";
import {NativeMarket} from "@capacitor-community/native-market";
import {APPINFO} from "@models/appInfo";
import {Share} from "@capacitor/share";
import {copyToClipboard} from "@helpers/misc.helpers";
import {UserService} from "@services/user.service";
import {getAuth, indexedDBLocalPersistence, onAuthStateChanged, setPersistence, signInAnonymously} from "firebase/auth";
import {firebaseApp} from "@app/app.module";
import {environment} from "@environments/environment";
import {ModalController, Platform} from "@ionic/angular";
import {connectFunctionsEmulator, getFunctions} from "firebase/functions";
import {PurchaseService} from "@services/inAppPurchase.service";
import {ShopComponent} from "@shared/components/shop/shop.component";
import {ModalService} from "@services/modal.service";
import {doc, Firestore, getFirestore, onSnapshot, Unsubscribe} from "firebase/firestore";
import {IUser} from "@models/user";
import {AppUpdate, AppUpdateAvailability} from "@capawesome/capacitor-app-update";
import {AdMobService} from "@services/adMob-service";
import {NotificationsService} from "@services/notifications.service";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {

    environment = environment;
    db!: Firestore;
    userSnapshotListener!: Unsubscribe;
    settingsSnapshotListener!: Unsubscribe;
    appPages = [];
    currentUser?: IUser;
    darkMode = false;
    authSubscription: any;
    bannerVisible = false;

    constructor(private translate: TranslateService,
                private adMobService: AdMobService,
                private purchaseService: PurchaseService,
                private modalController: ModalController,
                private notificationsService: NotificationsService,
                private modalService: ModalService,
                private platform: Platform,
                private userService: UserService,
                private miscService: MiscService) {
        this.adMobService.getBannerVisible()
            .subscribe(bannerVisible => {
                this.bannerVisible = !!bannerVisible;
            });
        this.initializeApp();
    }

    async darkModeChange() {
        this.darkMode = !this.darkMode;
        if (this.darkMode) {
            document.body.classList.toggle('dark', true);
            await Preferences.set({
                key: darkStorage,
                value: "true",
            });
        } else {
            document.body.classList.toggle('dark', false);
            await Preferences.remove({
                key: darkStorage,
            });
        }
    }

    async rateUs() {
        try {
            let {value} = await Preferences.get({key: rateUsStorage});
            // If user never clicked on rate us button we display the in app review
            if (!value) {
                try {
                    await InAppReview.requestReview();
                } catch (e: any) {
                    console.error(e);
                }
                // then we save in local storage a string "true"
                await Preferences.set({
                    key: rateUsStorage,
                    value: 'true',
                });
            } else {
                // if user already click on "rate us" we redirect him to the playstore or appstore
                // because ios and android do not allow to display the in app review prompt multiple time
                let packageName = APPINFO.iosId;
                if (Capacitor.getPlatform() === EPlatform.android) {
                    packageName = APPINFO.package;
                }
                await NativeMarket.openStoreListing({
                    appId: packageName,
                });
            }
        } catch (error: any) {
            console.error(error);
            this.miscService.displayError(error);
        }
    }

    async openPurchaseModal() {
        const modal = await this.modalController.create({
            component: ShopComponent as any,
            backdropDismiss: false,
            cssClass: "",
            componentProps: {}
        });
        await modal.present();
        this.modalService.openingModal();
    }

    async showShareOptions() {
        const res = await Share.canShare();
        const canShare = !!res?.value;

        const subject = this.translate.instant("shareSubject");
        let message = this.translate.instant("shareMessage");
        message += ` \niOS ➡️ ${APPINFO.iosUrl}\nAndroid ➡️ ${APPINFO.url}`;

        if (canShare) {

            let files: any[] = [];
            await Share.share({
                title: subject,
                text: message,
                dialogTitle: subject,
                files: files
            });
        } else {
            copyToClipboard(message);
            await this.miscService.presentToastWithOptions(
                'copiedToClipboard', false, EToastPosition.BOTTOM);
        }
    }

    async openLanguage() {

        try {
            const languageCode = await this.miscService.presentAlertLanguage();

            if (!languageCode) {
                return;
            }
            this.translate.use(languageCode);

            await Preferences.set({
                key: langStorage,
                value: languageCode,
            });

        } catch (e: any) {
            console.error(e);
        }
    }

    async setUserCall(id: string) {
        const lang = this.translate.currentLang;
        try {
            await this.userService.setUserCall({lang});
            this.getUserLive(id);
        } catch (e: any) {
            console.error(e);
        }
    }

    private stopListeners() {
        if (this.userSnapshotListener) {
            this.userSnapshotListener();
            this.userService.setUser();
        }
        if (this.settingsSnapshotListener) {
            this.settingsSnapshotListener();
        }
    }

    // small fix to allow user to close a modal by clicking on return button on android device
    private pressBackButton() {
        if (Capacitor.getPlatform() === EPlatform.android) {
            this.platform.backButton.subscribeWithPriority(10, async () => {
                const modal = await this.modalController.getTop();
                if (modal) {
                    modal.dismiss();
                }
            });
        } else if (Capacitor.getPlatform() === EPlatform.web) {
            window.history.pushState({}, '');
            this.modalService.getModalState().subscribe(isOpen => {
                if (isOpen) {
                    window.history.pushState({}, '');
                }
            });
            // Event listener for popstate
            window.addEventListener('popstate', async (event) => {
                const modal = await this.modalController.getTop();
                if (modal) {
                    modal.dismiss();
                }
            });
        }
    }

    private initializeApp() {
        this.platform.ready().then(async () => {
            const currentURL = window.location.href;
            console.log(currentURL);
            if (currentURL?.includes('localhost') && !environment.production) {
                connectFunctionsEmulator(getFunctions(firebaseApp, REGION), "localhost", EMULATORS_PORT);
            }
            this.setDarkMode();
            await this.initTranslation();
            this.manageAppVersion();
            this.pressBackButton();
            this.db = getFirestore(firebaseApp);
            await this.initializeFirebase();
            setTimeout(() => {
                this.notificationsService.manageNotifications();
            }, 5000)
        });
    }

    private async initializeFirebase() {
        console.log("initializeFirebase")
        const auth = getAuth(firebaseApp);
        console.log("auth", auth);

        this.authSubscription = onAuthStateChanged(auth, async user => {
            try {
                console.log("onAuthStateChanged", user);
                if (user?.uid) {
                    await this.setUserCall(user.uid);
                } else {
                    await this.setPersistenceDB();
                    this.stopListeners();
                }
            } catch (error) {
                console.error("Error in onAuthStateChanged:", error);
                // You can add additional error handling logic here if needed
            }
        });
    }

    private setPersistenceDB() {
        const auth = getAuth(firebaseApp);
        setPersistence(auth, indexedDBLocalPersistence).then(() => {
            // Existing and future Auth states are now persisted in the current
            // session only. Closing the window would clear any existing state even
            // if a user forgets to sign out.
            // ...
            // New sign-in will be persisted with session persistence.
            return signInAnonymously(auth);
        }).catch((error) => {
            console.error(error);
        });
    }

    private async setDarkMode() {
        let {value} = await Preferences.get({key: darkStorage});
        this.darkMode = !!value;
        if (value) {
            document.body.classList.toggle('dark', true);
        } else {
            document.body.classList.toggle('dark', false);
        }
    }

    private async initTranslation() {
        try {
            // this language will be used as a fallback when a translation isn't found in the current language
            this.translate.setDefaultLang(ELang.en);
            let lang = this.translate.getBrowserLang() || ELang.en;
            let {value} = await Preferences.get({key: langStorage});
            if (value) {
                lang = value as ELang;
            }
            // the lang to use, if the lang isn't available, it will use the current loader to get them
            this.translate.use(lang);
        } catch (e: any) {
            console.error(e);
        }
    }


    private async getUserLive(id: string) {
        if (this.userSnapshotListener) {
            await this.userSnapshotListener();
        }

        // https://firebase.google.com/docs/firestore/query-data/listen
        const referralQuery = doc(this.db, ECollection.users, id);

        this.userSnapshotListener = onSnapshot(referralQuery, async (d) => {
                console.log(d);
                let user;
                if (d?.exists()) {
                    user = d.data() as IUser;
                    console.log(user);
                    this.translate.use(user.lang);
                }
                this.userService.setUser(user);
                this.currentUser = user;
            },
            (error: any) => {
                console.error(error);
            }
        )
    }


    private async manageAppVersion() {
        try {
            const result = await AppUpdate.getAppUpdateInfo();
            if (result?.updateAvailability !== AppUpdateAvailability.UPDATE_AVAILABLE) {
                return;
            }
            if (result?.immediateUpdateAllowed) {
                await AppUpdate.performImmediateUpdate();
            } else {
                console.log("manageAppVersion", result);
                const currentVersion = result?.currentVersionName;
                const availableVersion = result?.availableVersionName;
                if (currentVersion !== availableVersion) {
                    await this.miscService.presentAlertUpdate();
                    await AppUpdate.openAppStore();
                }
            }
        } catch (error: any) {
            console.error("initializeAppLiveReload", error);
        }
    }
}
