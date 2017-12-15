import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UserService } from '../../user/user.service';
import { SetSpamService } from './mailsSetSpam.service';

@Injectable()
export class MailSetSpamBuilder {
  private http: Http;
  private userService: UserService;

  constructor(http: Http, userService: UserService) {
    this.http = http;
    this.userService = userService;
  }

  public build(mailID?: number): SetSpamService {
    return new SetSpamService(this.http, this.userService, mailID);
  }
}
