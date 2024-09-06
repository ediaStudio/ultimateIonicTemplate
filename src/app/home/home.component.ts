import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {MiscService} from "@services/misc.service";
import {ADS_REWARD_CREDITS} from "@models/general";
import {environment} from "@environments/environment";
import {AdMobService} from "@services/adMob-service";
import {NotificationsService} from "@services/notifications.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

    environment = environment;
    rewardReady = false;
    bannerVisible = false;
    private subscription = new Subject<void>();

    constructor(
        private adMobService: AdMobService,
        private miscService: MiscService,
        private notificationsService: NotificationsService, // If you don't need notification you can remove
        private translate: TranslateService) {
        this.adMobService.getBannerVisible()
            .subscribe(bannerVisible => {
                this.bannerVisible = !!bannerVisible;
            });
        this.adMobService.getRewardReady().pipe(takeUntil(this.subscription)).subscribe(rewardReady => {
            this.rewardReady = rewardReady;
        });
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.subscription.next();
        this.subscription.complete();
    }

    // If you don't need notification you can remove
    async testNotification() {
        await this.miscService.presentLoadingWithOptions();
        try {
            await this.notificationsService.testNotificationCall();
        } catch (e: any) {
            this.miscService.displayError(e);
        }
        this.miscService.dismissLoading();
    }

    async watchRewards() {
        const title = this.translate.instant('watchVideoForRewards', {count: ADS_REWARD_CREDITS});
        try {
            await this.miscService.gainCredits(title);
            this.adMobService.showRewardVideoAd();
        } catch (e: any) {
            console.log('user press cancel');
        }
    }

    displayBanner() {
        this.adMobService.showBanner();
    }

    removeBanner() {
        this.adMobService.removeBanner();
    }

    displayInterstitial() {
        this.adMobService.showInterstitial();
    }

}
