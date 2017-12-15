import { Component, EventEmitter, Output } from '@angular/core';
import { Response } from '@angular/http';
import { TdLoadingService } from '@covalent/core';
import * as _ from 'lodash';
import { FilesystemItemModel } from '../../../shared/models/filesystem-item';
import { IRequestHandler, RequestManager } from '../../../shared/request-manager';
import { FilesystemServiceBuilderService } from '../../../shared/services/request/filesystem/filesystem-service-builder-service';

@Component({
  selector: 'app-filesystem',
  templateUrl: 'filesystem.component.html',
})

export class FilesystemComponent implements IRequestHandler {

  public folderStack?: FilesystemItemModel[] = [];
  public firstLevel: boolean;
  public items: [FilesystemItemModel] = null;
  public searchItems: FilesystemItemModel[] = null;
  private requestServiceBuilder: FilesystemServiceBuilderService;
  private loadingService: TdLoadingService;
  private destinationItem?: FilesystemItemModel = null;
  public selectedItem: FilesystemItemModel = null;
  @Output() passDocToParent: EventEmitter<any> = new EventEmitter();
  @Output() updateBackArrow: EventEmitter<any> = new EventEmitter();

  constructor(requestServiceBuilder: FilesystemServiceBuilderService, loadingService: TdLoadingService) {
    this.requestServiceBuilder = requestServiceBuilder;
    this.loadingService = loadingService;
    this.firstLevel = false;
    setTimeout(() => this.goto(null), 0);
  }

  public doubleClick(item: FilesystemItemModel): void {
    this.updateBackArrow.emit(item);
    if (item.type === 'file') {
      return this.doubleClickFile(item);
    } else if (item.type === 'directory') {
      this.searchItems = null;
      return this.doubleClickFolder(item);
    }
    console.error('Invalid file type ' + item.type);
  }

  public click(item: FilesystemItemModel): void {
    this.selectedItem = item;
  }

  private doubleClickFolder(item: FilesystemItemModel): void {
    this.goto(item);
  }

  private doubleClickFile(item: FilesystemItemModel): void {
    this.passDocToParent.emit(item);
  }

  public up(): void {
    // Need to pop twice, otherwise the destination will be
    // in the stack twice: it was there before, and `success`
    // will push it one more time.
    this.updateBackArrow.emit(null);
    this.folderStack.pop();
    this.goto(this.folderStack.pop());
  }

  private goto(item?: FilesystemItemModel): void {
    this.destinationItem = item;
    const requestService = this.requestServiceBuilder.build(item !== null ? item.id : null);
    const manager = new RequestManager(requestService, this.loadingService, this);
    manager.send(null);
  }

  // IRequestHandler
  public complete(response: Response): void { }

  public success(response: Response): void {
    this.firstLevel = this.folderStack[this.folderStack.length - 1] !== null;
    this.folderStack.push(this.destinationItem);
    this.updateBackArrow.emit(null);
    this.destinationItem = null;
    const items: any = response.json();
    this.items = items.map((item) => {
      const newItem = new FilesystemItemModel();
      _.extend(newItem, item);
      return newItem;
    });
  }

  public afterSuccess(response: Response): void { }
  public error(response: Response): void { }

  public passFilesToParent(event: any) {
    this.searchItems = event;
  }
}
