import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';

import { NotFoundComponent } from '../misc/not-found.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { DashboardComponent } from './dashboard.component';
import { BabylonComponent } from './game/babylon/babylon.component';
import { DesktopComponent } from './game/desktop/desktop.component';
import { FilesystemComponent } from './game/filesystem/filesystem.component';
import { MailCenterComponent } from './game/mailcenter/mailcenter.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ShopComponent } from './shop/shop.component';
import { StatComponent } from './stats/stats.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: BabylonComponent,
      },
      {
        path: 'desktop',
        component: DesktopComponent,
      },
      {
        path: 'mailcenter',
        component: MailCenterComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'filesystem',
        component: FilesystemComponent,
      },
      {
        path: 'stats',
        component: StatComponent,
      },
      {
        path: 'leaderboard',
        component: LeaderboardComponent,
      },
      {
        path: 'shop',
        component: ShopComponent,
      },
      {
        path: 'achievements',
        component: AchievementsComponent,
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    AuthGuard,
  ],
})
export class DashboardRoutingModule { }
