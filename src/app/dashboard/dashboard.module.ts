import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
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
import { DashboardRoutingModule } from './dashboard-routing.module';

import {
  CovalentDataTableModule,
  CovalentFileModule,
  CovalentPagingModule,
  CovalentSearchModule,
  CovalentStepsModule,
} from '@covalent/core';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { NotFoundComponent } from '../misc/not-found.component';
import { DashboardComponent } from './dashboard.component';
import { DialogtutoComponent } from './game/babylon/tuto/tuto.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ProfileRemoveAccountComponent } from './profile/profile-forms/profile-remove-account/profile-remove-account.component';
import { ProfileUpdateInfoComponent } from './profile/profile-forms/profile-update-info/profile-update-info.component';
import { ProfileUpdatePasswordComponent } from './profile/profile-forms/profile-update-password/profile-update-password.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    ProfileUpdatePasswordComponent,
    ProfileUpdateInfoComponent,
    ProfileRemoveAccountComponent,
    LeaderboardComponent,
    DialogtutoComponent,
    NotFoundComponent,
  ],
  imports: [
    HttpModule,
    CommonModule,
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
    CovalentDataTableModule,
    CovalentMarkdownModule,
    CovalentPagingModule,
    CovalentSearchModule,
    CovalentStepsModule,
    CovalentFileModule,
    DashboardRoutingModule,
  ],
  entryComponents: [
    DialogtutoComponent,
  ],
  exports: [
    DialogtutoComponent,
  ],
})
export class DashboardModule { }
