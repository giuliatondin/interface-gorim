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
import { VotingComponent } from './voting/voting.component';
import { MatRadioModule } from '@angular/material/radio';
import { TableValuesComponent } from './table-values/table-values.component';

@NgModule({
    declarations: [
        HeaderComponent,
        TransferComponent,
        TableProductValuesComponent,
        TableValuesComponent,
        SideBarComponent,
        ConfirmingModalComponent,
        AlertComponent,
        InLineAlertComponent,
        VotingComponent
    ],
    imports: [
        CommonModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatButtonModule,
        MatRadioModule,
        FormsModule
    ], 
    exports: [
        HeaderComponent,
        TransferComponent,
        TableProductValuesComponent,
        TableValuesComponent,
        SideBarComponent,
        ConfirmingModalComponent,
        AlertComponent,
        InLineAlertComponent,
        VotingComponent
    ],
    entryComponents: [
        ConfirmingModalComponent
    ]
})
export class WorldModule { }