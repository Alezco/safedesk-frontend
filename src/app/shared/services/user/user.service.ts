import { Injectable } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import * as _ from 'lodash';
import { environment } from '../../../../environments/environment';
import { ServerTokensModel } from './serverTokens';

@Injectable()
export class UserService {

  private cookieService: CookieService;

  constructor(cookieService: CookieService) {
    this.cookieService = cookieService;
  }

  public isUserConnected(): boolean {
    return !_.isEmpty(this.getAccessToken());
  }

  public saveServerTokens(serverTokens: ServerTokensModel): void {
    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + serverTokens.expires_in);
    this.cookieService.put('access_token', serverTokens.access_token, { expires });
    // Refresh token has a lifetime equal to twice the access_token lifetime
    expires.setSeconds(expires.getSeconds() + serverTokens.expires_in);
    this.cookieService.put('refresh_token', serverTokens.refresh_token, { expires });
  }

  public getAccessToken(): string {
    const accessToken = this.cookieService.get('access_token');
    if (_.isEmpty(accessToken)) {
      return this.getNewAccessToken();
    }

    return accessToken;
  }

  private getNewAccessToken(): string {
    const refreshToken = this.cookieService.get('refresh_token');
    if (_.isEmpty(refreshToken)) {
      return null;
    }
    // TODO: implement request to get new access token, saveServerTokens and return new access_token
    return null;
  }

  public logout(): void {
    this.cookieService.remove('access_token');
    this.cookieService.remove('refresh_token');
    window.location.href = environment.frontUrl + '/login';
  }
};
