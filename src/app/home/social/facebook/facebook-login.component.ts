import { Component } from '@angular/core';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-facebook-login',
  templateUrl: 'facebook-login.component.html',
})

export class FacebookLoginComponent {
  public backUrl = environment.apiUrl + 'login/facebook';
  public callbackUrl = environment.frontUrl + '/login';
  public onesignalId = null;

  constructor() {
    if (window['notificationToken']) {
      this.onesignalId = window['notificationToken'];
    }
  }
}
