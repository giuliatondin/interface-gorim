import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { TransferComponent } from './transfer/transfer.component';
import { PurchaseComponent } from './purchase/purchase.component';

@NgModule({
  declarations: [HeaderComponent, TransferComponent, PurchaseComponent],
  imports: [
    CommonModule
  ], 
  exports: [
    HeaderComponent,
    TransferComponent
  ]
})
export class WorldModule { }