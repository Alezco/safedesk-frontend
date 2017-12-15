import { Response } from '@angular/http';
import { LoadingMode, LoadingType, TdLoadingService } from '@covalent/core';
import { isUndefined } from 'util';
import { InvalidLoginException } from './exceptions/invalid-login-exception';
import { RequestService } from './services/request/request.service';

export interface IRequestHandler {
  complete: (response: Response) => void;
  success: (response: Response) => void;
  afterSuccess: (response: Response) => void;
  error: (response: Response) => void;
  invalidCredentials?: (response: Response) => void;
}

export class RequestManager {

  private requestService: RequestService;
  private loadingService: TdLoadingService;
  private handler: IRequestHandler;

  constructor(requestService: RequestService, loadingService: TdLoadingService, handler: IRequestHandler) {
    loadingService.create({
      name: 'request',
      mode: LoadingMode.Indeterminate,
      type: LoadingType.Linear,
      color: 'accent',
    });
    this.requestService = requestService;
    this.loadingService = loadingService;
    this.handler = handler;
  }

  public send(data: {string}) {
    this.loadingService.register('request');
    this.requestService.onSubscribe(data).subscribe(
      (response: Response) => this.success(response),
      (response: Response) => this.error(response),
    );
  }

  private success(response: Response): void {
    this.complete(response);
    this.handler.success(response);
    this.handler.afterSuccess(response);
  }

  private error(response: Response): void {
    this.complete(response);
    if (response.status === 401) {
      this.invalidCredentials(response);
      return;
    }
    this.handler.error(response);
  }

  private invalidCredentials(response: Response): void {
    if (!isUndefined(this.handler.invalidCredentials)) {
      this.handler.invalidCredentials(response);
    } else {
      throw new InvalidLoginException('Invalid credentials', null);
    }
  }

  private complete(response: Response): void {
    this.loadingService.resolve('request');
    this.handler.complete(response);
  }
}
