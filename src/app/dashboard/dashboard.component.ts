import { Component } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user/user.service';
import { DialogtutoComponent } from './game/babylon/tuto/tuto.component';

@Component({
  selector: 'app-home',
  templateUrl: './dashboard.component.html',
})

export class DashboardComponent {

  menuItems: [{}] = [
    {
      icon: '3d_rotation',
      name: 'Office',
      description: 'Office place',
      router: '/dashboard',
    },
    {
      icon: 'computer',
      name: 'Desktop',
      description: 'Desktop game',
      router: '/dashboard/desktop',
    },
    {
      icon: 'email',
      name: 'Emails',
      description: 'Personal inbox',
      router: '/dashboard/mailcenter',
    },
    {
      icon: 'timeline',
      name: 'Statistics',
      description: 'Personal stats',
      router: '/dashboard/stats',
    },
    {
      icon: 'list',
      name: 'Leaderboard',
      description: 'Best players',
      router: '/dashboard/leaderboard',
    },
    {
      icon: 'attach_money',
      name: 'Shop',
      description: 'Buy new items',
      router: '/dashboard/shop',
    },
    {
      icon: 'stars',
      name: 'Achievements',
      description: 'See your achievements',
      router: '/dashboard/achievements',
    },
  ];
  private userService: UserService;
  private router: Router;
  private dialog: MdDialog;

  constructor(userService: UserService,
              router: Router,
              dialog: MdDialog) {
    this.userService = userService;
    this.dialog = dialog;
    this.router = router;
  }

  openLegit(): void {
    this.dialog.open(DialogtutoComponent, {
      height: '70%', // can be px or %
      width: '80%', // can be px or %
    });
  }

  logOut(): void {
    this.userService.logout();
  }
}
