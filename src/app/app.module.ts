import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgriculturistModule } from './agriculturist/agriculturist.module';
import { ErrorsModule } from './errors/errors.module';
import { WorldModule } from './world/world.module';
import { EntrepreneurModule } from './entrepreneur/entrepreneur.module';
import { SupervisorModule } from './supervisor/supervisor.module';
import { MayorModule } from './mayor/mayor.module';
import { AldermanModule } from './alderman/alderman.module';
import { MasterModule } from './master/master.module';
import { HomeModule } from './home/home.module';
import { WaitingPageModule } from './waiting-page/waiting-page.module';
import { AletrnativeSecondStagePageModule } from './alternative-second-stage-page/alertnative-second-stage-page.module';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HomeModule,
        AgriculturistModule,
        EntrepreneurModule,
        SupervisorModule,
        MayorModule,
        AldermanModule,
        WaitingPageModule,
        AletrnativeSecondStagePageModule,
        MasterModule,
        WorldModule,
        ErrorsModule,
        BrowserAnimationsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
