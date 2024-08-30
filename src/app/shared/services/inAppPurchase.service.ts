import {Injectable} from "@angular/core";
import "cordova-plugin-purchase";
import {ModalController, Platform as ionicPlatform} from "@ionic/angular";
import {BehaviorSubject} from "rxjs";
import {firebaseApp} from "@app/app.module";
import {Functions, getFunctions, httpsCallable} from "firebase/functions";
import {Capacitor} from "@capacitor/core";
import {EPlatform, REGION} from "@models/general";
import {EPurchaseProducts, ITransactionPayload} from "@models/transaction";
import {UserService} from "@services/user.service";
import {MiscService} from "@services/misc.service";
import IRegisterProduct = CdvPurchase.IRegisterProduct;
import Platform = CdvPurchase.Platform;
import Transaction = CdvPurchase.Transaction;
import Product = CdvPurchase.Product;


export interface IProduct extends Product {
    id: EPurchaseProducts,
    img?: string
}

// https://stackoverflow.com/questions/77339742/sandbox-bash13945-deny1-file-read-data-myapppath-ios-xcode-env-in-target
@Injectable({
    providedIn: 'root'
})
export class PurchaseService {

    userInit = false;
    functions: Functions = getFunctions(firebaseApp, REGION);

    private allProducts = new BehaviorSubject<IProduct[]>([]);

    constructor(
        public modalController: ModalController,
        public userService: UserService,
        public miscService: MiscService,
        public ionicPlatform: ionicPlatform) {

        this.ionicPlatform.ready().then(() => {
            this.getCurrentUser();
        });
    }

    getAllProducts() {
        return this.allProducts.asObservable();
    }

    setAllProducts(products: IProduct[]) {
        this.allProducts.next(products);
    }

    async restorePurchases() {
        await this.miscService.presentLoadingWithOptions("restoringPurchase");
        try {
            await CdvPurchase.store.restorePurchases();
            this.miscService.presentToastWithOptions("purchaseRestored", false);
        } catch (e: any) {
            console.error("error cdv", e);
            this.miscService.displayError(e);
        }
        this.miscService.dismissLoading();
    }

    async checkout(productId: EPurchaseProducts, offerId?: string) {
        try {
            const offer = CdvPurchase.store.get(productId)?.getOffer(offerId);
            await offer?.order();
            await this.miscService.dismissLoading();
        } catch (e: any) {
            console.error("error checkout", e);
            this.miscService.displayError(e);
            this.miscService.dismissLoading();
        }
    }

    private init() {
        this.initializeListeners();
        this.initializeCdvStore();
    }

    private initializeListeners() {
        // CdvPurchase.store.when()
        //   .approved(transaction => transaction.verify())
        //   .verified(receipt => receipt.finish());

        CdvPurchase.store.when().approved(async (transaction: any) => {
            console.log("approved", transaction);
            await this.miscService.presentLoadingWithOptions();
            await transaction.verify();
        });
        CdvPurchase.store.when().finished(async (transaction: any) => {
            console.log("finished", transaction);
            console.log("receipt", transaction.parentReceipt);
            this.miscService.dismissLoading();
            // CdvPurchase.store.verifiedPurchases
            this.saveTransaction(transaction)
        });
        //@ts-ignore
        // CdvPurchase.store.when().updated((data) => {
        //   console.log("updated", data);
        // });
        CdvPurchase.store.when().unverified((unverified) => {
            console.log("unverified", unverified);
            this.miscService.dismissLoading();
        });
        CdvPurchase.store.when().verified(async (receipt: any) => {
            console.log("verified", receipt);
            // const productId = receipt?.id;
            await receipt.finish();
        });
    }

    private async initializeCdvStore() {

        // CdvPurchase.store.validator = {
        //   url: "https://validator.iaptic.com/v1/validate?appName=il.org.osm.israelhiking" +
        //     "&apiKey=1245b587-4bbc-4fbd-a3f1-d51169a53063",
        //   timeout: 5000,
        // };

        let allProducts: IRegisterProduct[] = [];
        let allPlatforms: any[] = [];
        const currentPlatform = Capacitor.getPlatform();
        if (currentPlatform === EPlatform.web) {
            allProducts.push(CdvPurchase.Test.testProducts.CONSUMABLE);
            // To test the subscription
            // allProducts.push(CdvPurchase.Test.testProducts.PAID_SUBSCRIPTION);
            // event approved fire automatically
            // allProducts.push(CdvPurchase.Test.testProducts.PAID_SUBSCRIPTION_ACTIVE);
            allPlatforms.push({platform: Platform.TEST});
            CdvPurchase.store.verbosity = CdvPurchase.LogLevel.ERROR;
        } else if (currentPlatform === EPlatform.ios) {
            allPlatforms = [{platform: Platform.APPLE_APPSTORE}];
            allProducts = [{
                id: EPurchaseProducts.credits1IOS,
                type: CdvPurchase.ProductType.CONSUMABLE,
                platform: CdvPurchase.Platform.APPLE_APPSTORE,
            },
                // If you have subscription features
                //     {
                //     id: EPurchaseProducts.monthly,
                //     type: CdvPurchase.ProductType.PAID_SUBSCRIPTION,
                //     platform: CdvPurchase.Platform.APPLE_APPSTORE,
                // }
            ]
        } else if (currentPlatform === EPlatform.android) {
            allPlatforms = [{platform: Platform.GOOGLE_PLAY}];
            allProducts = [{
                id: EPurchaseProducts.credits1Android,
                type: CdvPurchase.ProductType.CONSUMABLE,
                platform: CdvPurchase.Platform.GOOGLE_PLAY,
            },
                // if you have subscription
                //     {
                //     id: EPurchaseProducts.sub_premium,
                //     type: CdvPurchase.ProductType.PAID_SUBSCRIPTION,
                //     platform: CdvPurchase.Platform.GOOGLE_PLAY,
                // }
            ]
        }

        CdvPurchase.store.register(allProducts);
        try {
            await CdvPurchase.store.initialize(allPlatforms);
        } catch (e: any) {
            console.error("error cdv", e);
        }
        let allMyProducts: IProduct[] = [];
        for (const p of allProducts) {
            let myProduct = await this.getProduct(p.id);
            if (myProduct) {
                allMyProducts.push(myProduct);
            }
        }
        this.setAllProducts(allMyProducts);
    }

    private async getProduct(productId: string): Promise<IProduct | undefined> {
        try {
            const product = await CdvPurchase.store.get(productId);
            if (product) {
                return product as IProduct;
            }
        } catch (e: any) {
            console.error("error cdv", e);
        }

        return;
    }

    private async saveTransaction(transaction: Transaction) {
        const productId = transaction?.products?.length ? transaction?.products[0].id : '';
        const offerId = transaction?.products?.length ? transaction?.products[0].offerId : '';
        if (productId) {
            await this.miscService.presentLoadingWithOptions();
            try {
                const transactionPayload: ITransactionPayload = {
                    productId,
                    offerId,
                    isPending: !!transaction?.isPending,
                    platform: transaction?.platform || '',
                    purchaseDate: transaction?.purchaseDate || '',
                    purchaseId: transaction?.purchaseId || '',
                    products: transaction?.products || [],
                    state: transaction?.state || '',
                    transactionId: transaction?.transactionId || '',
                } as any as ITransactionPayload
                const callRequest = httpsCallable(this.functions, 'transactions-saveTransaction');
                await callRequest(transactionPayload);
                // waiting for oncreate to fire
                setTimeout(() => {
                    this.miscService.dismissLoading();
                }, 2000)
            } catch (error: any) {
                console.error(error);
                this.miscService.dismissLoading();
                this.miscService.displayError(error);
            }
        }
    }


    private getCurrentUser() {
        this.userService.getUser().subscribe(async data => {
            if (!this.userInit && data) {
                this.userInit = true;
                setTimeout(() => {
                    this.init();
                }, 1000)
            }
        });
    }

}
