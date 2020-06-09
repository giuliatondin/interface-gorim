import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterComponent } from './master.component';



@NgModule({
  declarations: [MasterComponent],
  imports: [
    CommonModule
  ],
  exports: [
    MasterComponent
  ]
})
export class MasterModule { }
