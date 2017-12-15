import { Component, EventEmitter, Output } from '@angular/core';
import { Response } from '@angular/http';
import { TdLoadingService } from '@covalent/core';
import * as _ from 'lodash';
import { FilesystemItemModel } from '../../../../shared/models/filesystem-item';
import { IRequestHandler, RequestManager } from '../../../../shared/request-manager';
import {
    FilesystemSearchServiceBuilderService,
} from '../../../../shared/services/request/filesystem/filesystem-search-service-builder-service';

@Component({
  selector: 'app-filesystem-search',
  templateUrl: 'filesystem-search.component.html',
})

export class FilesystemSearchComponent implements IRequestHandler {
  private items: FilesystemItemModel[];
  private searchText: string;
  private requestServiceBuilder: FilesystemSearchServiceBuilderService;
  private loadingService: TdLoadingService;
  @Output() passFilesToParent: EventEmitter<any> = new EventEmitter();

  constructor(requestServiceBuilder: FilesystemSearchServiceBuilderService, loadingService: TdLoadingService) {
    this.requestServiceBuilder = requestServiceBuilder;
    this.loadingService = loadingService;
    this.searchText = '';
    this.items = [];
  }

  // IRequestHandler
  public complete(response: Response): void { }

  public success(response: Response): void { }

  public afterSuccess(response: Response): void {
    const items: any = response.json();
    const result = [];
    const keys = Object.keys(items);
    keys.forEach((key) => {
      result.push(items[key]);
    });
    this.items = result.map((item) => {
      const newItem = new FilesystemItemModel();
      _.extend(newItem, item);
      return newItem;
    });
    this.passFilesToParent.emit(this.items);
  }
  public error(response: Response): void { }

  public filterFiles(event: any) {
    if (event === '') {
      this.passFilesToParent.emit(null);
    } else {
      this.searchText = event;
      this.sendRequest();
    }
  }

  private sendRequest(): void {
    const requestService = this.requestServiceBuilder.build(this.searchText);
    const manager = new RequestManager(requestService, this.loadingService, this);
    manager.send(null);
  }
}
