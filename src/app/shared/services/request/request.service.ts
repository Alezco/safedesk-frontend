import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response, URLSearchParams } from '@angular/http';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user/user.service';

import { environment } from '../../../../environments/environment';

@Injectable()
export class RequestService {
  private static readonly WEBSITE_URL = environment.apiUrl;
  private endpoint: string;
  private originalEndpoint: string;
  private headers: Headers;
  private http: Http;
  private method: string;

  constructor(http: Http, userService: UserService, method: string, relativeUrl: string) {
    this.http = http;
    this.method = method;
    this.endpoint = RequestService.WEBSITE_URL + relativeUrl;
    this.originalEndpoint = this.endpoint;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.headers.append('Accept', 'application/json');
    if (userService.isUserConnected()) {
      this.headers.append('Authorization', 'Bearer ' + userService.getAccessToken());
    }
  }

  public setEndpoint(endpoint: string): void {
    this.endpoint = endpoint;
  }

  public resetEndpoint(): void {
    this.endpoint = this.originalEndpoint;
  }

  public onSubscribe(requestData: {string}): Observable<Response> {
    const normalizedMethodName = _.lowerCase(this.method);
    const urlParameters = this.getUrlParameters(requestData);
    if (normalizedMethodName === 'delete' || normalizedMethodName === 'get') {
      return this.makeRequestWithoutBody(urlParameters);
    }
    return this.makeRequestWithBody(urlParameters);
  }

  private makeRequestWithoutBody(urlParameters: URLSearchParams): Observable<Response> {
    return this.http[this.method](this.endpoint, new RequestOptions({ headers: this.headers, body: urlParameters }));
  }

  private makeRequestWithBody(urlParameters: URLSearchParams): Observable<Response> {
    return this.http[this.method](this.endpoint, urlParameters, new RequestOptions({ headers: this.headers }));
  }

  private getUrlParameters(data: {string}): URLSearchParams {
    const urlParams = new URLSearchParams();
    _.forEach(data, (value, key) => {
      urlParams.set(key, value);
    });
    return urlParams;
  }
}
