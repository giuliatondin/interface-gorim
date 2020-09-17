import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterComponent } from './master.component';
import { LeftsideBarComponent } from './leftside-bar/leftside-bar.component';



@NgModule({
  declarations: [
    MasterComponent,
    LeftsideBarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MasterComponent
  ]
})
export class MasterModule { }
