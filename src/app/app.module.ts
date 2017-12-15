import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { GlobalErrorHandler } from './app.error-handler.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { GameModule } from './dashboard/game/game.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HomeModule,
    GameModule,
    DashboardModule,
    SharedModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandler }],
})
export class AppModule { }
