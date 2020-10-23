import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { HeaderComponent } from './header/header.component';
import { TransferComponent } from './transfer/transfer.component';
import { TableValuesComponent } from './table-values/table-values.component';
import { SideBarComponent } from './sidebar/sidebar.component';
import { ConfirmingModalComponent, ConfirmingModalContentComponent } from './confirming-modal/confirming-modal.component';

@NgModule({
    declarations: [
        HeaderComponent,
        TransferComponent,
        TableValuesComponent,
        SideBarComponent,
        ConfirmingModalComponent,
        ConfirmingModalContentComponent
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
        TableValuesComponent,
        SideBarComponent,
        ConfirmingModalComponent
    ],
    entryComponents: [
        ConfirmingModalContentComponent
    ]
})
export class WorldModule { }