import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { SupervisorHistoryComponent } from './supervisor-history/supervisor-history.component';
import { SupervisorComponent } from './supervisor.component';

@NgModule({
    declarations: [
        SupervisorComponent,
        SupervisorHistoryComponent
    ],
    imports: [
        CommonModule,
        MatExpansionModule
    ],
    exports: [
        SupervisorComponent
    ]
})
export class SupervisorModule {
    //
}