import { Component, ViewChild } from '@angular/core';

import { TdLoadingService } from '@covalent/core';
import { RecaptchaComponent } from 'ng-recaptcha';
import { FormObjectRegister } from '../../shared/forms/auth/form-object-register';
import { Form } from '../../shared/forms/form';
import { RegisterService } from '../../shared/services/request/auth/register.service';

@Component({
  templateUrl: 'register-form.component.html',
})

export class RegisterFormComponent extends Form {
  @ViewChild('captchaRef') public captcha: RecaptchaComponent;

  constructor(registerService: RegisterService, loadingService: TdLoadingService) {
    super(registerService, loadingService, new FormObjectRegister());
  }

  public sendRegisterForm(): void {
    this.captcha.reset();
    this.captcha.execute();
  }

  public resolved(captchaResponse: string) {
    if (captchaResponse == null) {
      return;
    }
    this.formObject['g-recaptcha-response'] = captchaResponse;
    if (window['notificationToken']) {
      this.formObject['onesignal_id'] = window['notificationToken'];
    }
    this.submit();
  }

  protected getSuccessMessage(): string {
    return 'A confirmation email has been sent. Please confirm your account.';
  }
}
