import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { TransferComponent } from './transfer/transfer.component';
import { TableValuesComponent } from './table-values/table-values.component';
import { SideBarComponent } from './sidebar/sidebar.component';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        HeaderComponent,
        TransferComponent,
        TableValuesComponent,
        SideBarComponent
    ],
    imports: [
        CommonModule,
        MatSelectModule,
        ReactiveFormsModule
    ], 
    exports: [
        HeaderComponent,
        TransferComponent,
        TableValuesComponent,
        SideBarComponent
    ]
})
export class WorldModule { }