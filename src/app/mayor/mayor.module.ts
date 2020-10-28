import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MayorHistoryComponent } from './mayor-history/mayor-history.component';
import { MayorComponent } from './mayor.component';

@NgModule({
    declarations: [
        MayorComponent,
        MayorHistoryComponent
    ],
    imports: [
        CommonModule,
        MatExpansionModule
    ],
    exports: [
        MayorComponent
    ]
})
export class MayorModule {
    //
}