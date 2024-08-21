import {Injectable} from '@angular/core';
import {getFunctions, httpsCallable} from "firebase/functions";
import {REGION} from "@models/general";
import {firebaseApp} from "@app/app.module";
import {IUser} from "@models/user";
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    functions = getFunctions(firebaseApp, REGION);
    private user = new BehaviorSubject<IUser | undefined>(undefined);

    constructor() {
    }

    getUser() {
        return this.user.asObservable();
    }

    setUser(user?: IUser) {
        this.user.next(user);
    }

    async setUserCall(payload: any) {
        const callRequest = httpsCallable(this.functions, 'users-setUserCall');
        return callRequest(payload);
    }

    async getDailyRewardCall() {
        const callRequest = httpsCallable(this.functions, 'users-getDailyRewardCall');
        return callRequest();
    }


    async updateUserTokenCall(token: string) {
        try {
            const callRequest = httpsCallable(this.functions, 'users-updateUserTokenCall');
            await callRequest({token});
        } catch (e) {
            console.error(e);
        }
    }
}
