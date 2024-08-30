import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from "@models/firebase.credentials";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {indexedDBLocalPersistence, initializeAuth} from "firebase/auth";

export const firebaseApp = initializeApp(firebaseConfig);
// https://stackoverflow.com/questions/72143208/getauth-onauthstatechanged-not-called-async-not-resolving-in-capacitor
// Fix bug on ios or onAuthStateChanged never fire
//@ts-ignore
if (Capacitor.isNativePlatform()) {
    initializeAuth(firebaseApp, {
        persistence: indexedDBLocalPersistence
    });
}

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        IonicModule.forRoot(),
        AppRoutingModule],
    providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
    bootstrap: [AppComponent],
})
export class AppModule {
}
