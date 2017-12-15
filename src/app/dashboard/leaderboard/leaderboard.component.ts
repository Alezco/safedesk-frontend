import { Component } from '@angular/core';
import { Response } from '@angular/http';
import {
  ITdDataTableColumn,
  ITdDataTableSortChangeEvent,
  TdDataTableService,
  TdDataTableSortingOrder,
  TdLoadingService,
} from '@covalent/core';
import { IRequestHandler, RequestManager } from '../../shared/request-manager';
import { LeaderboardService } from '../../shared/services/request/leaderboard/leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
})
export class LeaderboardComponent implements IRequestHandler {
  loadingService: TdLoadingService;
  leaderboardService: LeaderboardService;
  dataTableService: TdDataTableService;

  // @ViewChild('pagingBar') pagingBar: TdPagingBarComponent;

  data: any[] = [];
  columns: ITdDataTableColumn[] = [
    { name: 'avatar_url', label: 'Avatar' },
    { name: 'rank', label: 'Rank' },
    { name: 'firstname', label: 'Firstname' },
    { name: 'lastname', label: 'Lastname' },
    { name: 'email', label: 'Email' },
    { name: 'score', label: 'Score', numeric: true },
  ];
  filteredData: any[];
  filteredTotal: number;
  sortBy = 'score';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;
  searchTerm = '';
  fromRow = 1;
  currentPage = 1;
  pageSize = 5;

  constructor(leaderboardService: LeaderboardService, loadingService: TdLoadingService, tdDataTableService: TdDataTableService) {
    this.leaderboardService = leaderboardService;
    this.loadingService = loadingService;
    this.dataTableService = tdDataTableService;
    this.makeRequest();
  }

  private makeRequest() {
    const manager = new RequestManager(this.leaderboardService, this.loadingService, this);
    manager.send(null);
  }

  // IRequestHandler
  public complete(response: Response): void { }
  public success(response: Response): void { }
  public error(response: Response): void { }
  public afterSuccess(response: Response) {
    this.data = response.json().data;
    this.data.forEach((item, index) => {
      item.rank = index + 1;
    });
    this.filteredData = this.data;
    this.filteredTotal = this.data.length;
  }

  public sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
    this.filter();
  }

  public search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filter();
  }

  filter(): void {
    let newData: any[] = this.data;
    newData = this.dataTableService.filterData(newData, this.searchTerm, true);
    this.filteredTotal = newData.length;
    newData = this.dataTableService.sortData(newData, this.sortBy, this.sortOrder);
    newData = this.dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
    this.filteredData = newData;
  }
}
