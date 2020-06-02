import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs'; 
import { AppComponent } from '../app.component';

//Components of farmers 
import { AgriculturistComponent } from './agriculturist/agriculturist.component';
import { ParcelComponent } from './parcel/parcel.component';
import { WorldModule } from '../world/world.module';

@NgModule({
  declarations: [
    AgriculturistComponent,
    ParcelComponent
  ],
  exports: [
    AgriculturistComponent,
  ],
  imports:[
    CommonModule,
    WorldModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AgriculturistsModule{}
