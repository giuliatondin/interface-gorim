import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';

//Components of farmers
import { FarmerComponent } from './farmer/farmer.component';
import { ParcelComponent } from './parcel/parcel.component';

@NgModule({
  declarations: [
    FarmerComponent,
    ParcelComponent
  ],
  exports: [
    FarmerComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class FarmersModule{}
