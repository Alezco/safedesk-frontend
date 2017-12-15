import { Optional } from '@angular/core';
import { Response } from '@angular/http';
import { TdLoadingService } from '@covalent/core';
import * as _ from 'lodash';
import { InvalidLoginException } from '../exceptions/invalid-login-exception';
import { IRequestHandler, RequestManager } from '../request-manager';
import { RequestService } from '../services/request/request.service';

export class Form implements IRequestHandler {

  public hasErrors = false;
  public formErrors = [];
  public formSuccess = null;
  public formObject: any;
  private manager: RequestManager;

  constructor(service: RequestService, loadingService: TdLoadingService, @Optional() formObject: any) {
    this.formObject = formObject;
    this.manager = new RequestManager(service, loadingService, this);
  }

  public submit(): void {
    this.formSuccess = null;
    this.hasErrors = false;
    this.manager.send(this.formObject);
  }

  public complete(response: Response): void {
    this.hasErrors = response.status !== 200;
  }

  public success(response: Response): void {
    this.formSuccess = {
      title: 'Success',
      description: this.getSuccessMessage(),
    };
  }

  public afterSuccess(response: Response): void { }

  public error(response: Response): void {
    this.formErrors = [];
    const body = response.json();

    if (response.status === 422) {
      this.invalidFields(body);
    } else if (response.status === 406) {
      this.accountNotConfirmed(body);
    } else if (response.status === 423) {
      this.invalidFields(body);
    } else {
      console.error('Response status not handled');
    }
  }

  private invalidFields(serverError: {}): void {
    _.forEach(serverError, (description, field) => {
      this.formErrors.push({ title: field, description });
    });
  }

  public invalidCredentials(response: Response): void {
    throw new InvalidLoginException('Invalid credentials', null);
  }

  private accountNotConfirmed(serverError: {}): void {
    this.formErrors.push({
      title: 'Error',
      description: 'The account has not been confirmed',
    });
  }

  protected getSuccessMessage(): string {
    return 'Form validated with success';
  }

  public setToken(token: string): void {
    this.formObject.token = token;
  }
}
