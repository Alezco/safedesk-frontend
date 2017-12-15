import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { IStepChangeEvent, StepState } from '@covalent/core';
@Component({
  selector: 'app-tuto-info',
  templateUrl: 'tuto.component.html',
})

export class DialogtutoComponent implements AfterViewInit {
  @ViewChild('step1') step1;
  @ViewChild('step2') step2;
  @ViewChild('step3') step3;
  @ViewChild('step4') step4;

  public stepList: any;
  public index: number;

  ngAfterViewInit() {
    this.stepList = [this.step1, this.step2, this.step3, this.step4]
    this.index = 0;
  }

  prev() {
    if (this.index > 0) {
      this.disableAll();
      this.index -= 1;
    }
    this.stepList[this.index].active = true;
  }

  next() {
    if (this.index < this.stepList.length - 1) {
      this.disableAll();
      this.index += 1;
      this.stepList[this.index].active = true;
    }

  }

  disableAll() {
    for (const elt of this.stepList) {
      elt.active = false;
    }
  }

}
