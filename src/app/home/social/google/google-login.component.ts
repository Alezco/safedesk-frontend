import { Component } from '@angular/core';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-google-login',
  templateUrl: 'google-login.component.html',
})

export class GoogleLoginComponent {
  public backUrl = environment.apiUrl + 'login/google';
  public callbackUrl = environment.frontUrl + '/login';
  public onesignalId = null;

  constructor() {
    if (window['notificationToken']) {
      this.onesignalId = window['notificationToken'];
    }
  }
}
