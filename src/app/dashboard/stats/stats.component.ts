import { AfterViewInit, Component } from '@angular/core';
import { Response } from '@angular/http';
import { TdDigitsPipe, TdLoadingService } from '@covalent/core';
import { Stats } from '../../shared/models/stats';
import { IRequestHandler, RequestManager } from '../../shared/request-manager';
import { ScoreService } from '../../shared/services/request/score/score.service';
import { StatService } from '../../shared/services/request/stats/stats.service';

@Component({
  selector: 'app-stat',
  templateUrl: './stats.component.html',
})
export class StatComponent implements IRequestHandler, AfterViewInit {
  // Chart
  single: any[] = [];
  pieData: any[] = [];
  received: any = [];
  goodReceived: any = [];
  badReceived: any = [];
  scoreGained: any = [];
  levelByDate: any = [];

  // options
  showXAxis: boolean;
  showYAxis: boolean;
  gradient: boolean;
  showLegend: boolean;
  showXAxisLabel: boolean;
  xAxisLabel: string;
  showYAxisLabel: boolean;
  yAxisLabel: string;
  showLabels: boolean;

  colorScheme: any = {
    domain: ['#1565C0', '#03A9F4', '#FFA726', '#FFCC80'],
  };

  statService: StatService;
  loadingService: TdLoadingService;

  // Safedesk variables
  stats: Stats;

  // Empty booleans
  public isPieEmpty: boolean;
  public isReceivedEmpty: boolean;
  public isGoodEmpty: boolean;
  public isBadEmpty: boolean;
  public isScoreGainedEmpty: boolean;
  public isLevelByDateEmpty: boolean;

  private scoreService: ScoreService;

  constructor(statService: StatService, loadingService: TdLoadingService, scoreService: ScoreService) {
    // Chart Single
    this.statService = statService;
    this.loadingService = loadingService;
    this.scoreService = scoreService;

    this.stats = new Stats();
    this.yAxisLabel = 'Sales';
    this.showLabels = true;
  }

  public ngAfterViewInit(): void {
    this.makeRequest();
  }

  private makeRequest() {
    const manager = new RequestManager(this.statService, this.loadingService, this);
    manager.send(null);
  }

  // IRequestHandler
  public complete(response: Response): void { }
  public success(response: Response): void { }
  public error(response: Response): void { }

  public afterSuccess(response: Response) {
    const stats: any = response.json();
    this.assignStats(stats);
    setTimeout(() => this.setStats(), 1000);
  }

  private assignStats(stats: any): void {
    this.stats.receivedCount = stats.received_count;
    this.stats.sentCount = stats.sent_count;
    this.stats.receivedFakeCount = stats.received_fake_count;
    this.stats.level = stats.level;
    this.stats.score = stats.score;
    this.stats.receivedCountByDate = stats.received_count_by_date;
    this.stats.goodSentCountByDate = stats.good_sent_count_by_date;
    this.stats.badSentCountByDate = stats.bad_sent_count_by_date;
    this.stats.scoreGainedByDate = stats.score_gained_by_date;
    this.stats.levelByDatetime = stats.level_by_datetime;
  }

  private setStats(): void {
    this.setTopLabels();
    this.setPie();
    this.setReceived();
    this.setGoodReceived();
    this.setBadReceived();
    this.setScoreGainedByDate();
    this.setLevelByDatetime();
    this.setEmpty();
  }

  private setTopLabels(): void {
    this.scoreService.setLevel(this.stats.level.name);
    this.scoreService.setScore(this.stats.score);
    this.single = [
      {
        name: 'Level',
        value: this.stats.level.name,
      },
      {
        name: 'Score',
        value: this.stats.score,
      },
      {
        name: 'Mails sent',
        value: this.stats.sentCount,
      },
      {
        name: 'Mails received',
        value: this.stats.receivedCount,
      },
    ];
  }

  private setPie(): void {
    this.pieData = [
      {
        name: 'Good',
        value: Object.keys(this.stats.goodSentCountByDate).length,
      },
      {
        name: 'Bad',
        value: Object.keys(this.stats.badSentCountByDate).length,
      },
    ];
  }

  private jsonObjectToArray(array: any): any {
    const res: any[] = [];
    for (const i in array) {
      if (array.hasOwnProperty(i)) {
        res.push({
          value: array[i],
          name: i,
        });
      }
    }
    return res;
  }

  private setReceived(): void {
    const series: any[] = this.jsonObjectToArray(this.stats.receivedCountByDate);
    this.received = [
      {
        name: 'Received',
        series,
      },
    ];
  }

  private setGoodReceived(): void {
    const series: any[] = this.jsonObjectToArray(this.stats.goodSentCountByDate);
    this.goodReceived = [
      {
        name: 'Received',
        series,
      },
    ];
  }

  private setBadReceived(): void {
    const series: any[] = this.jsonObjectToArray(this.stats.badSentCountByDate);
    this.badReceived = [
      {
        name: 'Received',
        series,
      },
    ];
  }

  private setEmpty(): void {
    this.pieData.forEach((item) => {
      this.isPieEmpty = item.value === 0;
    });
    this.isReceivedEmpty = this.received.length === 1 && this.received[0].series.length === 0;
    this.isGoodEmpty = this.goodReceived.length === 1 && this.goodReceived[0].series.length === 0;
    this.isBadEmpty = this.badReceived.length === 1 && this.badReceived[0].series.length === 0;
    this.isScoreGainedEmpty = this.scoreGained.length === 1 && this.scoreGained[0].series.length === 0;
    this.isLevelByDateEmpty = this.levelByDate.length === 1 && this.levelByDate[0].series.length === 0;
  }

  private setScoreGainedByDate(): void {
    const series: any[] = this.jsonObjectToArray(this.stats.scoreGainedByDate);
    this.scoreGained = [
      {
        name: 'Score gained by date',
        series,
      },
    ];
  }

  private setLevelByDatetime(): void {
    const series: any[] = [];
    for (const i in this.stats.levelByDatetime) {
      if (this.stats.levelByDatetime.hasOwnProperty(i)) {
        series.push({
          value: +this.stats.levelByDatetime[i]['name'],
          name: i,
        });
      }
    }
    this.levelByDate = [
      {
        name: 'Level by date',
        series,
      },
    ];
  }

  // ngx transform using covalent digits pipe
  public axisDigits(val: any): any {
    return new TdDigitsPipe().transform(val);
  }
}
