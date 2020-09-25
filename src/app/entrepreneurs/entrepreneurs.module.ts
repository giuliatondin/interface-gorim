import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorldModule } from '../world/world.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from '../app.component';
import { EntrepreneurComponent } from './entrepreneur/entrepreneur.component';
import { OrderProductComponent } from './order-product/order-product.component';
import { EntrepreneurHistoryComponent } from './entrepreneur-history/entrepreneur-history.component';
import { HistoryListComponent } from './entrepreneur-history/history-list/history-list.component';
import { VendaComponent } from './venda/venda.component';

@NgModule({
    declarations: [
        EntrepreneurComponent,
        OrderProductComponent,
        EntrepreneurHistoryComponent,
        HistoryListComponent,
        VendaComponent
    ],
    imports: [
        CommonModule,
        WorldModule,
        MatTabsModule, 
        MatSelectModule,
        MatExpansionModule,
        FormsModule,
        ReactiveFormsModule,
        
    ],
    exports: [
        EntrepreneurComponent
    ],
    bootstrap: [AppComponent]
})
export class EntrepreneursModule { }
