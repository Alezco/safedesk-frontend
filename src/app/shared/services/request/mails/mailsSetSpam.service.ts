import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UserService } from '../../user/user.service';
import { RequestService } from '../request.service';

@Injectable()
export class SetSpamService extends RequestService {
  constructor(http: Http, userService: UserService, mailID: number) {
    super(http, userService, 'post', 'api/emails/' + mailID + '/mark-spam');
  }
}
