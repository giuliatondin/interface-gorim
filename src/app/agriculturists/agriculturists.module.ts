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
import { StockComponent } from './stock/stock.component';
import { AgriculturistHistoryComponent } from './agriculturist-history/agriculturist-history.component';
import { HistoryListComponent } from './agriculturist-history/history-list/history-list.component';

@NgModule({
  declarations: [
    AgriculturistComponent,
    ParcelComponent,
    StockComponent,
    AgriculturistHistoryComponent,
    HistoryListComponent
  ],
  exports: [
    AgriculturistComponent,
  ],
  imports:[
    CommonModule,
    WorldModule,
    MatTabsModule, 
    MatSelectModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AgriculturistsModule{}
