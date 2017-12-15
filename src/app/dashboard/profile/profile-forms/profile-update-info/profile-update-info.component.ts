import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { TdLoadingService } from '@covalent/core';
import * as _ from 'lodash';
import { environment } from '../../../../../environments/environment';
import { FormObjectProfileInfo } from '../../../../shared/forms/dashboard/form-object-profile-info';
import { Form } from '../../../../shared/forms/form';
import { IRequestHandler, RequestManager } from '../../../../shared/request-manager';
import { GetProfileService } from '../../../../shared/services/request/profile/get-profile.service';
import { UpdateInfoProfileService } from '../../../../shared/services/request/profile/update-info-profile.service';

class ProfileInfoHandler implements IRequestHandler {

  private profileComponent: ProfileUpdateInfoComponent;

  constructor(profileComponent: ProfileUpdateInfoComponent) {
    this.profileComponent = profileComponent;
  }

  public complete(response: Response): void { }

  public success(response: Response): void {
    this.profileComponent.fillProfileInfoForm(response);
  }

  public afterSuccess(response: Response): void { }

  public error(response: Response): void {
    this.profileComponent.processGetInfoError(response);
  }
}

@Component({
  selector: 'app-profile-update-info',
  templateUrl: './profile-update-info.component.html',
})
export class ProfileUpdateInfoComponent extends Form {

  private getProfileService: GetProfileService;
  private loadingService: TdLoadingService;

  constructor(getProfileService: GetProfileService,
              updateInfoProfileService: UpdateInfoProfileService,
              loadingService: TdLoadingService) {
    super(updateInfoProfileService, loadingService, new FormObjectProfileInfo());
    this.getProfileService = getProfileService;
    this.loadingService = loadingService;
    this.makeGetInfoRequest();
  }

  private makeGetInfoRequest(): void {
    const handler = new ProfileInfoHandler(this);
    const manager = new RequestManager(this.getProfileService, this.loadingService, handler);
    manager.send(null);
  }

  public fillProfileInfoForm(response: Response) {
    _.extend(this.formObject, response.json());
  }

  public processGetInfoError(response: Response) {
    console.error(response);
  }

  public updateInfo(): void {
    this.formObject.callback_url = environment.frontUrl + '/dashboard/profile';
    if (window['notificationToken']) {
      this.formObject['onesignal_id'] = window['notificationToken'];
    }
    this.submit();
  }
}
