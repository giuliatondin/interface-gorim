import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { BeginModule } from './begin/begin.module';
import { ContinueModule } from './continue/continue.module';
import { HomeService } from './home.service';

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        BeginModule,
        ContinueModule
    ],
    exports: [
        HomeComponent
    ],
    providers: [
        HomeService
    ]
})
export class HomeModule{
    //
}