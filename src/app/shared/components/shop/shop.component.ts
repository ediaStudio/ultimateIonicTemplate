import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {IProduct, PurchaseService} from "@services/inAppPurchase.service";
import {IUser} from "@models/user";
import {setCountDown} from "@helpers/time.helpers";
import {EToastPosition, ONE_DAY_MS} from "@models/general";
import {TranslateService} from "@ngx-translate/core";
import {MiscService} from "@services/misc.service";
import {UserService} from "@services/user.service";
import {DAILY_REWARD_CREDITS, EPurchaseAmount, EPurchaseProducts} from "@models/transaction";
import {ModalController} from "@ionic/angular";
import {AdMobService} from "@services/adMob-service";
import Product = CdvPurchase.Product;


@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit, OnDestroy {

    EPurchaseProducts = EPurchaseProducts;
    currentUser?: IUser;
    creditsProducts: IProduct[] = [];
    dailyRewards: IProduct[] = [];
    dailyRewardsTimeLeftMs = 0;
    creditsLoading = false;
    isLoading = false;
    creditsCountdown = '';
    creditsInterval?: any;
    private subscription = new Subject<void>();

    constructor(
        private userService: UserService,
        private modalController: ModalController,
        private translate: TranslateService,
        private adMobService: AdMobService,
        private loadingToastAlertProvider: MiscService,
        private purchaseService: PurchaseService
    ) {
    }


    ngOnInit() {
        this.adMobService.hideBanner();
        this.getCurrentUser();
        this.startCreditsCountdown();
        this.dailyRewards = [{
            title: 'dailyCreditsRewards',
            description: this.translate.instant("creditsRewardsSub", {count: DAILY_REWARD_CREDITS}),
        }] as IProduct[];
        this.getAllProducts();
    }

    ngOnDestroy() {
        this.adMobService.resumeBanner();
        this.subscription.next();
        this.subscription.complete();
        this.clearCountdown();
    }

    close(event?: any) {
        event?.stopPropagation();
        this.modalController.dismiss();
    }

    async checkout(productId?: string, offerId?: string) {
        console.log(productId);
        console.log(offerId);
        if (!productId) {
            return;
        }

        try {
            await this.purchaseService.checkout(productId as EPurchaseProducts, offerId);
        } catch (e: any) {
            console.error(e);
        }
    }


    async getDailyReward() {
        if (this.creditsLoading) {
            return;
        }
        this.creditsLoading = true;

        try {
            await this.userService.getDailyRewardCall();
        } catch (e: any) {
            console.error(e);
            this.loadingToastAlertProvider.displayError(e);
        }
    }

    getProductPrice(product?: Product) {
        return product?.pricing?.price;
    }

    getConsumableCount(id: EPurchaseProducts): EPurchaseAmount {
        switch (id) {
            case EPurchaseProducts.credits1Android:
            case EPurchaseProducts.credits1IOS:
                return EPurchaseAmount.credits1
        }

        return 0 as EPurchaseAmount;
    }


    private startCreditsCountdown() {
        // Update the count down every 1 second
        this.creditsInterval = setInterval(() => {
            const currentTimestamp = this.currentUser?.lastDailyRewardCreditsTimestamp || 0;
            const nextRewards = currentTimestamp + ONE_DAY_MS;
            const now = Date.now();
            if (!this.currentUser || now > nextRewards) {
                this.creditsCountdown = '';
                return;
            }
            const duration = nextRewards - now;
            this.creditsCountdown = setCountDown(duration);
            if (!this.creditsCountdown) {
                this.loadingToastAlertProvider.presentToastWithOptions(
                    'dailyRewardsCreditsReady',
                    false,
                    EToastPosition.TOP
                );
            }
        }, 1000);
    }

    private clearCountdown() {
        if (this.creditsInterval) {
            clearInterval(this.creditsInterval);
        }
    }

    private async getAllProducts() {
        this.isLoading = true;
        this.purchaseService.getAllProducts().pipe(takeUntil(this.subscription)).subscribe(allProducts => {
            console.log("allProducts", allProducts);
            this.creditsProducts = allProducts.filter(p =>
                p.id === EPurchaseProducts.credits1Android
                || p.id === EPurchaseProducts.credits1IOS
                || p.id === EPurchaseProducts.test_consumable
            );
            console.log(allProducts);
            if (allProducts?.length) {
                this.isLoading = false;
            }
        });
    }

    private getCurrentUser() {
        this.userService.getUser().pipe(takeUntil(this.subscription)).subscribe(async data => {
            this.currentUser = data;
        });
    }

}



