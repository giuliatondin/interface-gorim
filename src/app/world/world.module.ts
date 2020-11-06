import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { HeaderComponent } from './header/header.component';
import { TransferComponent } from './transfer/transfer.component';
import { TableProductValuesComponent } from './table-product-values/table-product-values.component';
import { SideBarComponent } from './sidebar/sidebar.component';
import { ConfirmingModalComponent, ConfirmingModalContentComponent } from './confirming-modal/confirming-modal.component';
import { AlertComponent } from './alert/alert.component';
import { InLineAlertComponent } from './inline-alert/inline-alert.component';

@NgModule({
    declarations: [
        HeaderComponent,
        TransferComponent,
        TableProductValuesComponent,
        SideBarComponent,
        ConfirmingModalComponent,
        ConfirmingModalContentComponent,
        AlertComponent,
        InLineAlertComponent
    ],
    imports: [
        CommonModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatDialogModule,
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
        ConfirmingModalContentComponent
    ]
})
export class WorldModule { }