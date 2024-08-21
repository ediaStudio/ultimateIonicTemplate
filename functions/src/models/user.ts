import {ELang} from "./language";

export interface IUser {
    created: number
    updated: number
    lang: ELang
    credits: number
    notificationTokens?: string[]
    dailyNotificationSent: boolean
    lastDailyRewardCreditsTimestamp: number
    userId: string
    documentId?: string
}

export enum EDailyRewardsType {
    credits = "credits",
}
