import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserService } from '../services/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  private router: Router;
  private userService: UserService;

  constructor(router: Router, userService: UserService) {
    this.router = router;
    this.userService = userService;
  }

  canActivate(): boolean {
    if (this.userService.isUserConnected()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
