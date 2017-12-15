import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MdButtonModule,
  MdCardModule,
  MdChipsModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdSidenavModule,
  MdToolbarModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { HomeRoutingModule } from './home-routing.module';

import { CookieService } from 'angular2-cookie/services/cookies.service';
import { RecaptchaModule } from 'ng-recaptcha';
import { AuthGuard } from '../shared/guards';

import { ChangePassComponent } from './changepass/changepass-form.component';
import { ContactComponent } from './contact/contact.component';
import { FaqComponent } from './faq/faq.component';
import { ForgotPassComponent } from './forgotpass/forgotpass-form.component';
import { HomeComponent } from './home.component';
import { LoginFormComponent } from './login/login-form.component';
import { PresentationComponent } from './presentation/presentation.component';
import { RegisterFormComponent } from './register/register-form.component';
import { FacebookLoginComponent } from './social/facebook/facebook-login.component';
import { GoogleLoginComponent } from './social/google/google-login.component';
import { TeamComponent } from './team/team.component';

@NgModule({
  declarations: [
    LoginFormComponent,
    RegisterFormComponent,
    PresentationComponent,
    HomeComponent,
    ChangePassComponent,
    ForgotPassComponent,
    ContactComponent,
    TeamComponent,
    FaqComponent,
    FacebookLoginComponent,
    GoogleLoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MdToolbarModule,
    MdButtonModule,
    MdSidenavModule,
    MdIconModule,
    MdListModule,
    MdCardModule,
    MdGridListModule,
    MdInputModule,
    MdChipsModule,
    MdMenuModule,
    HomeRoutingModule,
    RecaptchaModule.forRoot(),
  ],
  exports: [
    HomeComponent,
    PresentationComponent,
    LoginFormComponent,
    RegisterFormComponent,
  ],
  providers: [AuthGuard, CookieService],
})
export class HomeModule { }
