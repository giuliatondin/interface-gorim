import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BeginComponent } from './begin.component';
import { BeginService } from './begin.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        BeginComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule
    ],
    exports: [
        BeginComponent
    ],
    providers: [
        BeginService
    ]
})
export class BeginModule{
    //
}