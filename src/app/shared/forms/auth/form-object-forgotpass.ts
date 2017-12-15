import { environment } from '../../../../environments/environment';

export class FormObjectForgotPass {
  public email: string;
  public reset_password_url: string;

  constructor() {
    this.reset_password_url = environment.frontUrl + '/change-password';
  }
}
