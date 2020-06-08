import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import { HeaderComponent } from './header/header.component';
import { TransferComponent } from './transfer/transfer.component';
import { TableValuesComponent } from './table-values/table-values.component';
import { HistoryComponent } from './history/history.component';

@NgModule({
  declarations: [HeaderComponent, TransferComponent, TableValuesComponent, HistoryComponent],
  imports: [
    CommonModule,
    MatExpansionModule
  ], 
  exports: [
    HeaderComponent,
    TransferComponent,
    TableValuesComponent,
    HistoryComponent
  ]
})
export class WorldModule { }