import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';

//Components of farmers 
import { AgriculturistComponent } from './agriculturist/agriculturist.component';
import { ParcelComponent } from './parcel/parcel.component';

@NgModule({
  declarations: [
    AgriculturistComponent,
    ParcelComponent
  ],
  exports: [
    AgriculturistComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AgriculturistsModule{}
