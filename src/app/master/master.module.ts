import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterComponent } from './master.component';
import { LeftsideBarComponent } from './leftside-bar/leftside-bar.component';
import { WorldModule } from '../world/world.module';
import { RightSideBarComponent } from './rightside-bar/rightside-bar.component';



@NgModule({
    declarations: [
        MasterComponent,
        LeftsideBarComponent,
        RightSideBarComponent
    ],
    imports: [
        CommonModule,
        WorldModule
    ],
    exports: [
        MasterComponent
    ]
})
export class MasterModule { }
