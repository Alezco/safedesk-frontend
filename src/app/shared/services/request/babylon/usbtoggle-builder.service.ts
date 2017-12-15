import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UserService } from '../../user/user.service';
import { UsbToggleService } from './usbtoggle.service';

@Injectable()
export class UsbToggleServiceBuilder {
  private http: Http;
  private userService: UserService;

  constructor(http: Http, userService: UserService) {
    this.http = http;
    this.userService = userService;
  }

  public build(usbId?: number): UsbToggleService {
    return new UsbToggleService(this.http, this.userService, usbId);
  }
}
