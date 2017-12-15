import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { UserService } from '../../user/user.service';
import { RequestService } from '../request.service';

@Injectable()
export class RemoveProfileService extends RequestService {
  constructor(http: Http, userService: UserService) {
    super(http, userService, 'delete', 'api/user-account/delete-user');
  }
}
