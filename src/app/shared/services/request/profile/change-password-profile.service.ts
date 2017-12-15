import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { UserService } from '../../user/user.service';
import { RequestService } from '../request.service';

@Injectable()
export class ChangePasswordProfileService extends RequestService {
  constructor(http: Http, userService: UserService) {
    super(http, userService, 'patch', 'api/user-account/change-password');
  }
}
