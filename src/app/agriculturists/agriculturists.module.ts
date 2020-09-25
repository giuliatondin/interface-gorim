import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select'; 
import {MatExpansionModule} from '@angular/material/expansion';
import { AppComponent } from '../app.component';

//Components of farmers 
import { AgriculturistComponent } from './agriculturist/agriculturist.component';
import { ParcelComponent } from './parcel/parcel.component';
import { WorldModule } from '../world/world.module';
import { AgriculturistHistoryComponent } from './agriculturist-history/agriculturist-history.component';
import { HistoryListComponent } from './agriculturist-history/history-list/history-list.component';
import { VendaComponent } from '../agriculturists/venda/venda.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AgriculturistComponent,
        ParcelComponent,
        AgriculturistHistoryComponent,
        HistoryListComponent,
        VendaComponent
    ],
    exports: [
        AgriculturistComponent,
    ],
    imports:[
        CommonModule,
        WorldModule,
        MatTabsModule, 
        MatSelectModule,
        MatExpansionModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AgriculturistsModule{}
