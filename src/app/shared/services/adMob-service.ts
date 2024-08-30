import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';
import {BehaviorSubject} from 'rxjs';
import {
    AdLoadInfo,
    AdMob,
    AdmobConsentStatus,
    AdMobRewardItem,
    AdOptions,
    BannerAdOptions,
    BannerAdPluginEvents,
    BannerAdPosition,
    BannerAdSize,
    InterstitialAdPluginEvents,
    RewardAdOptions,
    RewardAdPluginEvents
} from "@capacitor-community/admob";
import {AdMobError} from "@capacitor-community/admob/dist/esm/shared";
import {Capacitor} from "@capacitor/core";
import {EPlatform} from "@models/general";

@Injectable({
    providedIn: 'root'
})
export class AdMobService {

    // TODO false in prod
    isTesting = true;

    bannerId = "ca-app-pub-5672455571394042/7608904697"; // TODO replace by your android banner id
    interstitialId = "ca-app-pub-5672455571394042/8659096637"; // TODO replace by your android interstitial id
    rewardId = "ca-app-pub-5672455571394042/9110259444"; // TODO replace by your android rewards id

    interReadyBool = false;
    private timeout = 60000;
    private interReady = new BehaviorSubject<boolean>(false);
    private rewardReady = new BehaviorSubject<boolean>(false);
    private bannerVisible = new BehaviorSubject<boolean>(false);


    constructor(
        // private usersService: UserService,
        public platform: Platform) {

        console.log('AdMobProvider constructor');

        if (Capacitor.getPlatform() !== EPlatform.web) {
            this.init();
        }
    }

    async prepareInterstitial() {
        const options: AdOptions = {
            adId: this.interstitialId,
            isTesting: this.isTesting
            // npa: true
        };
        try {
            await AdMob.prepareInterstitial(options);
        } catch (e: any) {
            console.error(e);
        }
    }

    async prepareReward() {
        const options: RewardAdOptions = {
            adId: this.rewardId,
            isTesting: this.isTesting
            // npa: true
            // ssv: {
            //   userId: "A user ID to send to your SSV"
            //   customData: JSON.stringify({ ...MyCustomData })
            //}
        };
        try {
            await AdMob.prepareRewardVideoAd(options);
        } catch (e: any) {
            console.error(e);
        }
    }

    async showBanner() {
        if (Capacitor.getPlatform() === EPlatform.web) {
            return;
        }

        const options: BannerAdOptions = {
            adId: this.bannerId,
            adSize: BannerAdSize.BANNER,
            position: BannerAdPosition.BOTTOM_CENTER,
            margin: 0,
            isTesting: this.isTesting
            // npa: true
        };

        try {
            await AdMob.showBanner(options);
            this.setBannerVisible(true);
        } catch (e: any) {
            console.error(e);
        }
    }

    async removeBanner() {
        try {
            await AdMob.removeBanner();
            this.setBannerVisible(false);
        } catch (e: any) {
            console.error(e);
        }
    }

    async hideBanner() {
        try {
            await AdMob.hideBanner();
            this.setBannerVisible(false);
        } catch (e: any) {
            console.error(e);
        }
    }

    async resumeBanner() {
        try {
            await AdMob.resumeBanner();
            this.setBannerVisible(true);
        } catch (e: any) {
            console.error(e);
        }
    }

    async showInterstitial() {
        try {
            await AdMob.showInterstitial();
        } catch (e: any) {
            console.error(e);
        }
    }

    async showRewardVideoAd() {
        try {
            const rewardItem = await AdMob.showRewardVideoAd();
            console.log(rewardItem);
        } catch (e: any) {
            console.error('rewardVideoAd', e);
        }
    }

    getRewardReady() {
        return this.rewardReady.asObservable();
    }

    setRewardReady(rewardReady: boolean) {
        this.rewardReady.next(rewardReady);
    }

    getInterReady() {
        return this.interReady.asObservable();
    }

    setInterReady(ready: boolean) {
        this.interReadyBool = ready;
        this.interReady.next(ready);
    }

    getBannerVisible() {
        return this.bannerVisible.asObservable();
    }

    setBannerVisible(visible: boolean) {
        if (Capacitor.getPlatform() === EPlatform.web) {
            visible = false;
        }
        this.bannerVisible.next(visible);
    }

    private async initializeAdmob(): Promise<void> {
        await AdMob.initialize();

        setTimeout(async () => {
            const [trackingInfo, consentInfo] = await Promise.all([
                AdMob.trackingAuthorizationStatus(),
                AdMob.requestConsentInfo(),
            ]);

            if (trackingInfo.status === 'notDetermined') {
                /**
                 * If you want to explain TrackingAuthorization before showing the iOS dialog,
                 * you can show the modal here.
                 * ex)
                 * const modal = await this.modalCtrl.create({
                 *   component: RequestTrackingPage,
                 * });
                 * await modal.present();
                 * await modal.onDidDismiss();  // Wait for close modal
                 **/

                await AdMob.requestTrackingAuthorization();
            }

            const authorizationStatus = await AdMob.trackingAuthorizationStatus();
            if (
                authorizationStatus?.status === 'authorized' &&
                consentInfo?.status === AdmobConsentStatus.REQUIRED
            ) {
                await AdMob.showConsentForm();
            }
        }, 3000)
    }

    private init() {

        this.platform.ready().then(async () => {

            try {
                await this.initializeAdmob();


                if (Capacitor.getPlatform() === EPlatform.ios) {
                    this.bannerId = "ca-app-pub-5672455571394042/4719851628"; // TODO replace by your ios banner id
                    this.interstitialId = "ca-app-pub-5672455571394042/3309900750"; // TODO replace by your ios interstitial id
                    this.rewardId = "ca-app-pub-5672455571394042/4707980008"; // TODO replace by your ios rewards id
                }


                if (this.isTesting) {
                    // DO NOT CHANGE
                    // PROVIDED BY GOOGLE FOR TESTING
                    this.bannerId = 'ca-app-pub-3940256099942544/6300978111';
                    this.interstitialId = 'ca-app-pub-3940256099942544/1033173712';
                    // const interstitialVideoId = 'ca-app-pub-3940256099942544/8691691433';
                    this.rewardId = 'ca-app-pub-3940256099942544/5224354917';
                }

                this.initListeners();

                // TODO uncomment if we want to display banner at launch
                // this.showBanner();

                //Prepare Ad to Show
                this.prepareInterstitial();
                //
                //Prepare Ad to Show
                this.prepareReward();
            } catch (e: any) {
                console.error(e);
            }
        });
    }

    private initListeners() {

        // AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
        //   // Subscribe Banner Event Listener
        // });
        //
        // AdMob.addListener(BannerAdPluginEvents.SizeChanged, (size: AdMobBannerSize) => {
        //   // Subscribe Change Banner Size
        // });
        // AdMob.addListener(BannerAdPluginEvents.Closed, () => {
        //   // Subscribe Change Banner Size
        // });

        AdMob.addListener(BannerAdPluginEvents.FailedToLoad, (error) => {
            setTimeout(() => {
                // this.showBanner();
            }, this.timeout);
        });

        // INTERSTITIAL

        AdMob.addListener(InterstitialAdPluginEvents.Loaded, (info: AdLoadInfo) => {
            console.log(info);
            // Subscribe prepared interstitial
            this.setInterReady(true);
        });

        AdMob.addListener(InterstitialAdPluginEvents.Dismissed, () => {
            // Subscribe prepared interstitial
            this.setInterReady(false);
            this.prepareInterstitial();
        });

        AdMob.addListener(InterstitialAdPluginEvents.FailedToLoad, (error: AdMobError) => {
            console.error(error);
            // Subscribe prepared interstitial
            this.setInterReady(false);
            setTimeout(() => {
                this.prepareInterstitial();
            }, this.timeout);
        });


        AdMob.addListener(InterstitialAdPluginEvents.FailedToShow, (error: AdMobError) => {
            console.error(error);
            // Subscribe prepared interstitial
            this.setInterReady(false);
            setTimeout(() => {
                this.prepareInterstitial();
            }, this.timeout);
        });

        // REWARDS

        AdMob.addListener(RewardAdPluginEvents.Loaded, (info: AdLoadInfo) => {
            // Subscribe prepared rewardVideo
            console.log(info);
            this.setRewardReady(true);
        });


        AdMob.addListener(RewardAdPluginEvents.Dismissed, () => {
            this.setRewardReady(false);
            this.prepareReward();
        });


        AdMob.addListener(RewardAdPluginEvents.FailedToLoad, (error: AdMobError) => {
            console.error('RewardAdPluginEvents.FailedToLoad', error);
            this.setRewardReady(false);
            setTimeout(() => {
                this.prepareReward();
            }, this.timeout);
        });


        AdMob.addListener(RewardAdPluginEvents.FailedToShow, (error: AdMobError) => {
            console.log(error);
            this.setRewardReady(false);
            setTimeout(() => {
                this.prepareReward();
            }, this.timeout);
        });

        AdMob.addListener(RewardAdPluginEvents.Rewarded, (rewardItem: AdMobRewardItem) => {
            // Subscribe user rewarded
            console.log('RewardAdPluginEvents.Rewarded', rewardItem);
            this.getAdsRewardsCall();
            if (rewardItem?.type) {
                // {returnValue: true
                // rewardAmount: 30
                // rewardType: "V-Bucks"}
            }
        });
    }

    private async getAdsRewardsCall() {
        try {
            // TODO
            // await this.usersService.getAdsRewardsCall();
        } catch (e: any) {
            console.error(e);
        }
    }

}
