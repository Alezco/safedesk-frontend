import { Component, ViewChild } from '@angular/core';
import { Response } from '@angular/http';

import { TdLoadingService } from '@covalent/core';
import { RecaptchaComponent } from 'ng-recaptcha';
import { Form } from '../../shared/forms/form';
import { FormContact } from '../../shared/forms/home/form-object-contact';
import { ContactService } from '../../shared/services/request/home/contact.service';

@Component({
  templateUrl: 'contact.component.html',
})

export class ContactComponent extends Form {
  @ViewChild('captchaRef') public captcha: RecaptchaComponent;

  constructor(contactService: ContactService, loadingService: TdLoadingService) {
    super(contactService, loadingService, new FormContact());
  }

  public sendContactForm() {
    this.captcha.reset();
    this.captcha.execute();
  }

  public resolved(captchaResponse: string) {
    if (captchaResponse == null) {
      return;
    }
    this.formObject['g-recaptcha-response'] = captchaResponse;
    this.submit();
  }

  public afterSuccess(response: Response) {
    this.formObject = new FormContact();
  }

  public getSuccessMessage(): string {
    return 'Your message has been sent to the team. They will get back to you as soon as possible';
  }
}
