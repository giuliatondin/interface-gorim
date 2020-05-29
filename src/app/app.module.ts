import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgriculturistsModule } from './agriculturists/agriculturists.module';
import { ErrorsModule } from './errors/errors.module';
import { WorldModule } from './world/world.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgriculturistsModule,
    WorldModule,
    ErrorsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
