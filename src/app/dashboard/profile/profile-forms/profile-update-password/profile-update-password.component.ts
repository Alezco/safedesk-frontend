import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { TdLoadingService } from '@covalent/core';
import { FormObjectProfilePassword } from '../../../../shared/forms/dashboard/form-object-profile-password';
import { Form } from '../../../../shared/forms/form';
import { ChangePasswordProfileService } from '../../../../shared/services/request/profile/change-password-profile.service';

@Component({
  selector: 'app-profile-update-password',
  templateUrl: './profile-update-password.component.html',
})
export class ProfileUpdatePasswordComponent extends Form {
  constructor(changePasswordProfileService: ChangePasswordProfileService, loadingService: TdLoadingService) {
    super(changePasswordProfileService, loadingService, new FormObjectProfilePassword());
  }

  public afterSuccess(response: Response) {
    this.formObject = new FormObjectProfilePassword();
  }

  public invalidCredentials(response: Response): void {
    this.hasErrors = true;
    this.formErrors.push({
      title: 'Invalid credentials',
      description: 'invalid current password',
    });
  }
}
