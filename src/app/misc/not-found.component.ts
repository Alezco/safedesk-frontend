import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../environments/environment';
import { RequestService } from '../shared/services/request/request.service';
import { UserService } from '../shared/services/user/user.service';

@Component({
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {
  public badge = null;

  constructor(http: Http, userService: UserService, activatedRoute: ActivatedRoute) {
    activatedRoute.queryParams.subscribe((params: Params) => {
      if (params['token']) {
        const token = params['token'];
        const requestService = new RequestService(http, userService, 'post', `curious/${token}`);
        requestService.onSubscribe(null).subscribe(
          (response: Response) => {
            this.badge = response.json();
            this.badge.image = environment.apiUrl + this.badge.image;
          }, (response: Response) => {});
      }
    });
  }
}
