import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { TransferComponent } from './transfer/transfer.component';
import { TableValuesComponent } from './table-values/table-values.component';
import { SideBarComponent } from './sidebar/sidebar.component';

@NgModule({
    declarations: [
        HeaderComponent,
        TransferComponent,
        TableValuesComponent,
        SideBarComponent
    ],
    imports: [
        CommonModule
    ], 
    exports: [
        HeaderComponent,
        TransferComponent,
        TableValuesComponent,
        SideBarComponent
    ]
})
export class WorldModule { }