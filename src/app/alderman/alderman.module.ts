import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { AldermanHistoryComponent } from './alderman-history/alderman-history.component';
import { AldermanComponent } from './alderman.component';

@NgModule({
    declarations: [
        AldermanComponent,
        AldermanHistoryComponent
    ],
    imports: [
        CommonModule,
        MatExpansionModule
    ],
    exports: [
        AldermanComponent
    ]
})
export class AldermanModule {
    //
}