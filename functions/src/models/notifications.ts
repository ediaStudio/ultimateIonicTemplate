export enum ENotificationType {
    dailyRewards = "dailyRewards",
    test = "test",
}

export interface INotificationsParams {
    name?: string;
    message?: string;
}
