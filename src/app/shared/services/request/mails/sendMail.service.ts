import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TdLoadingService } from '@covalent/core';
import { UserService } from '../../user/user.service';
import { RequestService } from '../request.service';

@Injectable()
export class SendMailService extends RequestService {
  constructor(http: Http, userService: UserService, loadingService: TdLoadingService) {
    super(http, userService, 'post', 'api/emails/reply');
  }
}
