import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { HeaderComponent } from './header/header.component';
import { TransferComponent } from './transfer/transfer.component';
import { TableProductValuesComponent } from './table-product-values/table-product-values.component';
import { SideBarComponent } from './sidebar/sidebar.component';
import { ConfirmingModalComponent } from './confirming-modal/confirming-modal.component';
import { AlertComponent } from './alert/alert.component';
import { InLineAlertComponent } from './inline-alert/inline-alert.component';

@NgModule({
    declarations: [
        HeaderComponent,
        TransferComponent,
        TableProductValuesComponent,
        SideBarComponent,
        ConfirmingModalComponent,
        AlertComponent,
        InLineAlertComponent
    ],
    imports: [
        CommonModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatButtonModule,
        FormsModule
    ], 
    exports: [
        HeaderComponent,
        TransferComponent,
        TableProductValuesComponent,
        SideBarComponent,
        ConfirmingModalComponent,
        AlertComponent,
        InLineAlertComponent
    ],
    entryComponents: [
        ConfirmingModalComponent
    ]
})
export class WorldModule { }