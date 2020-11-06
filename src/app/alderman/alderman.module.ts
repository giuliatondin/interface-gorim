import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { WorldModule } from '../world/world.module';
import { AldermanHistoryComponent } from './alderman-history/alderman-history.component';
import { AldermanSugestionComponent } from './alderman-sugestion/alderman-sugestion.component';
import { AldermanComponent } from './alderman.component';
import { ResponseListComponent } from './response-list/response-list.component';

@NgModule({
    declarations: [
        AldermanComponent,
        AldermanHistoryComponent,
        AldermanSugestionComponent,
        ResponseListComponent
    ],
    imports: [
        CommonModule,
        MatExpansionModule,
        MatTabsModule,
        WorldModule,
        FormsModule,
        ReactiveFormsModule,
        MatRadioModule,
        MatCheckboxModule
    ],
    exports: [
        AldermanComponent
        // ,
        // AldermanHistoryComponent,
        // AldermanSugestionComponent
    ]
})
export class AldermanModule {
    //
}