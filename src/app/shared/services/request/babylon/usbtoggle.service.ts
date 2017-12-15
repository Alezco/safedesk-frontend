import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { UserService } from '../../user/user.service';
import { RequestService } from '../request.service';

@Injectable()
export class UsbToggleService extends RequestService {
  constructor(http: Http, userService: UserService, id: number) {
    super(http, userService, 'patch', 'api/usb/plug/' + id);
  }
}
