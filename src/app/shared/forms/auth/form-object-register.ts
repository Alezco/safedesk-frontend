import { environment } from '../../../../environments/environment';

export class FormObjectRegister {
  public firstname: string;
  public lastname: string;
  public email: string;
  public password: string;
  public confirmation_callback_url: string;

  constructor() {
    this.confirmation_callback_url = environment.frontUrl + '/login';
  }
}
