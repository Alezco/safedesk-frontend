import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { TdLoadingService } from '@covalent/core';
import { LoginService } from '../../shared/services/request/auth/login.service';
import { UserService } from '../../shared/services/user/user.service';

import { FormObjectLogin } from '../../shared/forms/auth/form-object-login';
import { Form } from '../../shared/forms/form';
import { ServerTokensModel } from '../../shared/services/user/serverTokens';

@Component({
  templateUrl: 'login-form.component.html',
})

export class LoginFormComponent extends Form {
  private userService: UserService;
  private router: Router;
  private activatedRoute: ActivatedRoute;

  constructor(loginService: LoginService, userService: UserService,
              loadingService: TdLoadingService, router: Router, activatedRoute: ActivatedRoute) {
    super(loginService, loadingService, new FormObjectLogin());
    this.userService = userService;
    this.router = router;
    this.activatedRoute = activatedRoute;
    this.testUrlParams();
  }

  public invalidCredentials(object: any) {
    this.formErrors.push({
      title: 'Error',
      description: 'Invalid credentials',
    });
  }

  public afterSuccess(response: Response): void {
    this.userService.saveServerTokens(response.json());
    this.router.navigate(['/dashboard']);
  }

  private testUrlParams() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params['access_token']) {
        const serverToken = new ServerTokensModel();
        serverToken.access_token = params['access_token'];
        serverToken.refresh_token = params['refresh_token'];
        serverToken.expires_in = params['expires_in'];
        serverToken.token_type = params['token_type'];
        this.userService.saveServerTokens(serverToken);
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
