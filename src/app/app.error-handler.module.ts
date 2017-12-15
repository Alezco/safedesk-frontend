import { ErrorHandler, Injectable } from '@angular/core';
import { InvalidLoginException } from './shared/exceptions/invalid-login-exception';
import { UserService } from './shared/services/user/user.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  handleError(error: any): void {
    if (error instanceof InvalidLoginException && this.userService.isUserConnected()) {
      this.userService.logout();
      return;
    }
    throw error;
  }
}
