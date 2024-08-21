import {NgModule} from '@angular/core';
import {HomeRoutingModule} from "@app/home/home-routing.module";
import {HomeComponent} from "@app/home/home.component";
import {SharedModule} from "@shared/shared.module";


@NgModule({
    declarations: [HomeComponent],
    imports: [
        SharedModule,
        HomeRoutingModule
    ]
})
export class HomeModule {
}
