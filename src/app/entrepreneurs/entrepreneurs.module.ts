import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorldModule } from '../world/world.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';

import { AppComponent } from '../app.component';
import { EntrepreneurComponent } from './entrepreneur/entrepreneur.component';
import { ProductOrderedComponent } from './product-ordered/product-ordered.component';
import { EntrepreneurHistoryComponent } from './entrepreneur-history/entrepreneur-history.component';
import { HistoryListComponent } from './entrepreneur-history/history-list/history-list.component';

@NgModule({
  declarations: [EntrepreneurComponent, ProductOrderedComponent, EntrepreneurHistoryComponent, HistoryListComponent],
  imports: [
    CommonModule,
    WorldModule,
    MatTabsModule, 
    MatSelectModule,
    MatExpansionModule
  ],
  exports: [
    EntrepreneurComponent
  ],
  bootstrap: [AppComponent]
})
export class EntrepreneursModule { }
