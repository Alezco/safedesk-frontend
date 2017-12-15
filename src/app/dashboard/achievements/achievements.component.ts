import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { TdLoadingService } from '@covalent/core';
import { IRequestHandler, RequestManager } from '../../shared/request-manager';
import { LegitUser } from '../../shared/services/request/gameinfo/legituser.service';

@Component({
  selector: 'app-achievements',
  templateUrl: 'achievements.component.html',
})

export class AchievementsComponent implements IRequestHandler {
  private loadingService: TdLoadingService;
  private legitService: LegitUser;

  constructor(loadingService: TdLoadingService, legitService: LegitUser) {
    this.loadingService = loadingService;
    this.legitService = legitService;
  }

  private makeRequest() {
    const manager = new RequestManager(this.legitService, this.loadingService, this);
    manager.send(null);
  }

  // IRequestHandler
  public complete(response: Response): void { }

  public success(response: Response): void {
    const items: any = response.json();
  }

  public afterSuccess(response: Response): void { }
  public error(response: Response): void { }
}
