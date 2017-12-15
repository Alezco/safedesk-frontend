import { Component, ViewChild } from '@angular/core';
import { FilesystemItemModel } from '../../../shared/models/filesystem-item';
import { TopLevelWindowManager } from '../../../shared/services/window/window.service';
import { SubwindowType } from '../entity/subwindow/subwindow.component';

@Component({
  selector: 'app-desktop',
  templateUrl: 'desktop.component.html',
})

export class DesktopComponent {

  public SubwindowType = SubwindowType;

  public topLevelItems: FilesystemItemModel[] = [];

  public folders: string[];
  public topLevels: string[];
  public emails: string[];

  public mailCenterTitle = 'Mail Center';
  public fileExplorerTitle = 'File Explorer';
  public windowManager: TopLevelWindowManager;
  public count: number;
  @ViewChild('mailCenter') mailCenterElement;
  @ViewChild('fs') fsElement;

  constructor(windowManager: TopLevelWindowManager) {
    this.emails = [];
    this.folders = [];
    this.topLevels = [];
    this.folders.push('1');
    this.windowManager = windowManager;
    this.count = 0;
  }

  clickOnFolder() {
    this.addTopLevel();
  }

  clickOnEmail() {
    if (this.emails.length === 0) {
      this.emails.push('ok');
    }
    this.windowManager.setFocusFor(this.mailCenterElement);
  }

  removeTopLevel(index: number) {
    this.topLevels.splice(index, 1);
  }

  removeTopLevelItem(index: number) {
    this.topLevelItems.splice(index, 1);
  }

  removeEmail() {
    this.emails.pop();
  }

  private addTopLevel(): void {
    this.topLevels.push('' + this.count);
    this.count++;
    this.windowManager.setFocusFor(this.fsElement);
  }

  OpenDoc(item: any) {
    const index = this.topLevelItems.findIndex((openItem) => openItem.id === item.id);
    if (index < 0) {
      this.topLevelItems.push(item);
    }
  }
}
