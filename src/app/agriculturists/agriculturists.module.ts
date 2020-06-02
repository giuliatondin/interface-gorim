import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select'; 
import { AppComponent } from '../app.component';

//Components of farmers 
import { AgriculturistComponent } from './agriculturist/agriculturist.component';
import { ParcelComponent } from './parcel/parcel.component';
import { WorldModule } from '../world/world.module';
import { PurchaseComponent } from './purchase/purchase.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AgriculturistComponent,
    ParcelComponent,
    AlertComponent,
    PurchaseComponent
  ],
  exports: [
    AgriculturistComponent,
  ],
  imports:[
    CommonModule,
    WorldModule,
    MatTabsModule, 
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AgriculturistsModule{}
