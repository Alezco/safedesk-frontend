import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { UserService } from '../../user/user.service';
import { RequestService } from '../request.service';

@Injectable()
export class UpdateInfoProfileService extends RequestService {
  constructor(http: Http, userService: UserService) {
    super(http, userService, 'put', '/api/user-account/update-info');
  }
}
