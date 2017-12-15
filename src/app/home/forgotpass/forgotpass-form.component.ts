import { Component } from '@angular/core';
import { FormObjectForgotPass } from '../../shared/forms/auth/form-object-forgotpass';
import { Form } from '../../shared/forms/form';

import { TdLoadingService } from '@covalent/core';
import { ForgotPassService } from '../../shared/services/request/auth/forgotpass.service';

@Component({
  templateUrl: './forgotpass-form.component.html',
})

export class ForgotPassComponent extends Form {
  constructor(forgotPassService: ForgotPassService, loadingService: TdLoadingService) {
    super(forgotPassService, loadingService, new FormObjectForgotPass());
  }

  public getSuccessMessage(): string {
    return 'If you have an account, an email has been sent to you with a reset link';
  }
}
