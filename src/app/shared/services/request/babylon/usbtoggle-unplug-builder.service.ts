import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UserService } from '../../user/user.service';
import { UsbToggleUnPlugService } from './usbtoggle-unplug.service';

@Injectable()
export class UsbToggleUnPlugServiceBuilder {
  private http: Http;
  private userService: UserService;

  constructor(http: Http, userService: UserService) {
    this.http = http;
    this.userService = userService;
  }

  public build(usbId?: number): UsbToggleUnPlugService {
    return new UsbToggleUnPlugService(this.http, this.userService, usbId);
  }
}
