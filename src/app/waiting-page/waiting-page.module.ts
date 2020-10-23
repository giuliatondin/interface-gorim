import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WaitingPageComponent } from './waiting-page.component';

@NgModule({
    declarations : [
        WaitingPageComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        WaitingPageComponent
    ]
})
export class WaitingPageModule {
    //
}