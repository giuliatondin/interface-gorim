import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { TransferComponent } from './transfer/transfer.component';
import { TableValuesComponent } from './table-values/table-values.component';

@NgModule({
  declarations: [HeaderComponent, TransferComponent, TableValuesComponent],
  imports: [
    CommonModule
  ], 
  exports: [
    HeaderComponent,
    TransferComponent,
    TableValuesComponent
  ]
})
export class WorldModule { }