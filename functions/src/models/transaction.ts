export const DAILY_REWARD_CREDITS = 100; // 60

export enum EPurchaseProducts {
    credits1Android = "credits1", // TODO replace by your product id for android
    credits1IOS = "credits1_ios", // TODO replace by your product id for ios
    test_consumable = 'test-consumable',
    test_subscription = 'test-subscription',
    test_subscription_active = 'test-subscription-active'
}

export interface ITransactionPayload {
    productId: EPurchaseProducts,
    offerId?: string,
    isPending: boolean,
    platform: ETransactionPlatform,
    purchaseDate: Date,
    purchaseId: string,
    products: {
        id: EPurchaseProducts
    }[],
    state: string,
    transactionId: string // this is equal to purchaseToken
}

export interface ITransaction extends ITransactionPayload {
    created: number,
    userId: string // uid but it's dynamic so we cannot trust
    // playerId: string
}

export enum ETransactionPlatform {
    /** Apple AppStore */
    APPLE_APPSTORE = "ios-appstore",
    /** Google Play */
    GOOGLE_PLAY = "android-playstore",
    /** Windows Store */
    WINDOWS_STORE = "windows-store-transaction",
    /** Braintree */
    BRAINTREE = "braintree",
    /** Test platform */
    TEST = "test"
}

export enum EPurchaseAmount {
    credits1 = 500, // 1 euro
}

export interface ITransactionIOS {
    transactionId: string
    originalTransactionId: string
    webOrderLineItemId: string
    bundleId: string
    productId: EPurchaseProducts
    subscriptionGroupIdentifier: string
    purchaseDate: number
    originalPurchaseDate: number
    expiresDate: number
    quantity: number
    type: string
    inAppOwnershipType: EIOSOwnership
    signedDate: number
    environment: string
    transactionReason: string
    storefront: string
    storefrontId: string
    price: number
    currency: string
}


export enum EIOSOwnership {
    PURCHASED = "PURCHASED"
}
