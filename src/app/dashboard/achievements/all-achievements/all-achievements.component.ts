import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { TdLoadingService } from '@covalent/core';
import { environment } from '../../../../environments/environment';
import { IRequestHandler, RequestManager } from '../../../shared/request-manager';
import { AchievementsService } from '../../../shared/services/request/achievements/achievements.service';

@Component({
  selector: 'app-all-achievements',
  templateUrl: 'all-achievements.component.html',
})

export class AllAchievementsComponent implements IRequestHandler {
  private loadingService: TdLoadingService;
  private achievementsService: AchievementsService;
  public achievements: any[] = [];

  constructor(loadingService: TdLoadingService, achievementsService: AchievementsService) {
    this.loadingService = loadingService;
    this.achievementsService = achievementsService;
    this.makeRequest();
  }

  private makeRequest() {
    const manager = new RequestManager(this.achievementsService, this.loadingService, this);
    manager.send(null);
  }

  // IRequestHandler
  public complete(response: Response): void { }

  public success(response: Response): void {
    const items: any = response.json();
    items.forEach((item) => {
      item.image = environment.apiUrl + item.image;
      this.achievements.push(item);
    });
  }

  public afterSuccess(response: Response): void { }
  public error(response: Response): void { }
}
