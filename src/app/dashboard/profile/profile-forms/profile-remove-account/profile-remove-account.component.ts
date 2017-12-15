import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { TdLoadingService } from '@covalent/core';
import { FormObjectProfileDelete } from '../../../../shared/forms/dashboard/form-object-profile-delete';
import { Form } from '../../../../shared/forms/form';
import { RemoveProfileService } from '../../../../shared/services/request/profile/remove-profile.service';
import { UserService } from '../../../../shared/services/user/user.service';

@Component({
  selector: 'app-profile-remove-account',
  templateUrl: './profile-remove-account.component.html',
})
export class ProfileRemoveAccountComponent extends Form {

  private userService: UserService;

  constructor(userService: UserService,
              removeProfileService: RemoveProfileService,
              loadingService: TdLoadingService) {
    super(removeProfileService, loadingService, new FormObjectProfileDelete());
    this.userService = userService;
  }

  public afterSuccess(response: Response) {
    this.userService.logout();
  }

  public invalidCredentials(response: Response): void {
    this.hasErrors = true;
    this.formErrors.push({
      title: 'Invalid credentials',
      description: 'invalid current password',
    });
  }
}
