import { Component } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent {
  private cookieService: CookieService;

  constructor(cookieService: CookieService) {
    this.cookieService = cookieService;
    this.handleOneSignal();
  }

  private handleOneSignal() {
    let useragentid = null;
    const OneSignal = window['OneSignal'] || [];
    const oldId = this.cookieService.get('notificationToken');
    if (oldId) {
      window['notificationToken'] = oldId;
    }
    OneSignal.push(['init', {
      appId: environment.oneSignalAppId,
      autoRegister: true,
      safari_web_id: environment.oneSignalSafariAppId,
    }]);
    OneSignal.push(() => {
      OneSignal.getUserId().then((userId) => {
        if (userId !== null) {
          useragentid = userId;
          OneSignal.push(['getNotificationPermission', (permission) => {}]);
        }
      });
    });
    OneSignal.push(() => {
      OneSignal.on('subscriptionChange', (isSubscribed) => {
        if (isSubscribed) {
          OneSignal.getUserId().then((userId) => {
            useragentid = userId;
          }).then(() => {
            if (useragentid !== null) {
              OneSignal.setSubscription(true);
              window['notificationToken'] = useragentid;
              this.cookieService.put('notificationToken', useragentid);
            } else {
              OneSignal.registerForPushNotifications({
                modalPrompt: true,
              });
            }
          });
        } else {
          OneSignal.getUserId().then((userId) => {
            useragentid = userId;
          });
        }
      });
    });
  }
}
