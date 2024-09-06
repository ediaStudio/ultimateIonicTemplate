export const langStorage = "lang";
export const darkStorage = "dark";
export const rateUsStorage = "rateUs";
export const ADS_REWARD_CREDITS = 1;
export const REGION = 'us-central1'; // TODO replace by your region
export const EMULATORS_PORT = 8001;
export const ONE_DAY_MS = 86400000;

export enum EPlatform {
    ios = 'ios',
    android = 'android',
    web = 'web',
}

export enum ECollection {
    users = 'users',
    transactions = 'transactions',
}

export enum EToastPosition {
    TOP = "top",
    MIDDLE = "middle",
    BOTTOM = "bottom"
}


export enum EFunctionsErrorCode {
    OK = 'ok',
    CANCELLED = 'cancelled',
    UNKNOW = 'unknown',
    INVALID_ARGUMENT = 'invalid-argument',
    DEADLINE_EXCEEDED = 'deadline-exceeded',
    NOT_FOUND = 'not-found',
    ALREADY_EXISTS = 'already-exists',
    PERMISSION_DENIED = 'permission-denied',
    RESOURCES_EXHAUSTED = 'resource-exhausted',
    FAILED_PRECONDITION = 'failed-precondition',
    ABORTED = 'aborted',
    OUT_OF_RANGE = 'out-of-range',
    UNIMPLEMENTED = 'unimplemented',
    INTERNAL = 'internal',
    UNAVALAIBLE = 'unavailable',
    DATA_LOSS = 'data-loss',
    UNAUTHENTICATED = 'unauthenticated',
}
