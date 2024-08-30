import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
import {TranslateModule} from "@ngx-translate/core";
import {RouterModule} from "@angular/router";
import {ShopComponent} from "@shared/components/shop/shop.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule,
        ReactiveFormsModule,
        TranslateModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule,
        ReactiveFormsModule,
        TranslateModule,
        ShopComponent
    ],
    declarations: [ShopComponent]
})
export class SharedModule {
}
