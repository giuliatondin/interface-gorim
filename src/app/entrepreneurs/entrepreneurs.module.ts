import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntrepreneurComponent } from './entrepreneur/entrepreneur.component';
import { WorldModule } from '../world/world.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { AppComponent } from '../app.component';
import { ProductOrderedComponent } from './product-ordered/product-ordered.component';

@NgModule({
  declarations: [EntrepreneurComponent, ProductOrderedComponent],
  imports: [
    CommonModule,
    WorldModule,
    MatTabsModule, 
    MatSelectModule
  ],
  exports: [
    EntrepreneurComponent
  ],
  bootstrap: [AppComponent]
})
export class EntrepreneursModule { }
