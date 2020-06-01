import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { TransferComponent } from './transfer/transfer.component';

@NgModule({
  declarations: [HeaderComponent, TransferComponent],
  imports: [
    CommonModule
  ], 
  exports: [
    HeaderComponent,
    TransferComponent
  ]
})
export class WorldModule { }
