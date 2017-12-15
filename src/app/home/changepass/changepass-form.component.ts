import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TdLoadingService } from '@covalent/core';
import { FormObjectChangePass } from '../../shared/forms/auth/form-object-changepass';
import { Form } from '../../shared/forms/form';

import { ChangePassService } from '../../shared/services/request/auth/changepass.service';

@Component({
  templateUrl: './changepass-form.component.html',
})

export class ChangePassComponent extends Form implements OnInit {
  public formObject: FormObjectChangePass;
  public passMismatch: boolean;
  public passwordCheck: string;
  private activatedRoute: ActivatedRoute;

  constructor(changepassService: ChangePassService, activatedRoute: ActivatedRoute,
              loadingService: TdLoadingService) {
    super(changepassService, loadingService, new FormObjectChangePass());
    this.activatedRoute = activatedRoute;
  }

  public getSuccessMessage(): string {
    return 'Your password has been changed with success';
  }

  ngOnInit() {
    // subscribe to router event
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const token = params['token'];
      this.setToken(token);
    });
  }

  checkForm() {
    if (this.passwordCheck === this.formObject.new_password) {
      this.passMismatch = false;
      this.submit();
    } else {
      this.passMismatch = true;
    }
  }
}
