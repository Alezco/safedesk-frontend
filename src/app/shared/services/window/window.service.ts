import { Injectable } from '@angular/core';
import { SubwindowComponent } from '../../../dashboard/game/entity/subwindow/subwindow.component';

@Injectable()
export class TopLevelWindowManager {
  public topLevels: SubwindowComponent[];

  constructor() {
    this.topLevels = [];
  }

  setFocusFor(val: SubwindowComponent) {
    let count = 0;
    for (const sub of this.topLevels) {
      if (sub === val) {
        sub.desktopWindow.pane.style.zIndex = '99';
      } else {
        sub.desktopWindow.pane.style.zIndex = count;
      }
      count++;
    }
  }
}
