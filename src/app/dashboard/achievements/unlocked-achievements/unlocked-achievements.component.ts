import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { TdLoadingService } from '@covalent/core';
import { environment } from '../../../../environments/environment';
import { IRequestHandler, RequestManager } from '../../../shared/request-manager';
import { UnlockedAchievementsService } from '../../../shared/services/request/achievements/unlocked-achievements.service';

@Component({
  selector: 'app-unlocked-achievements',
  templateUrl: 'unlocked-achievements.component.html',
})

export class UnlockedAchievementsComponent implements IRequestHandler {
  private loadingService: TdLoadingService;
  private unlockedAchievementsService: UnlockedAchievementsService;
  public achievements: any[] = [];

  constructor(loadingService: TdLoadingService, unlockedAchievementsService: UnlockedAchievementsService) {
    this.loadingService = loadingService;
    this.unlockedAchievementsService = unlockedAchievementsService;
    this.makeRequest();
  }

  private makeRequest() {
    const manager = new RequestManager(this.unlockedAchievementsService, this.loadingService, this);
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
