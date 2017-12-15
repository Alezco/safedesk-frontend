import { AfterViewInit, Component } from '@angular/core';
import { Response } from '@angular/http';
import { MdDialogRef } from '@angular/material';
import { TdLoadingService } from '@covalent/core';
import { IRequestHandler, RequestManager } from '../../../../shared/request-manager';
import { LegitUser } from '../../../../shared/services/request/gameinfo/legituser.service';

@Component({
  selector: 'app-legit-info',
  templateUrl: 'legit-info.component.html',
})

export class DialogLegitComponent implements IRequestHandler, AfterViewInit {
  public dialogRef: MdDialogRef<any>;
  private loadingService: TdLoadingService;
  private legitService: LegitUser;
  public content: string;
  public services: any[];
  public usersLegit: any[];

  constructor(loadingService: TdLoadingService,
              legitService: LegitUser,
              dialogRef: MdDialogRef<any>) {

    this.dialogRef = dialogRef;
    this.loadingService = loadingService;
    this.legitService = legitService;
    this.content = 'ez';
    this.services = [];
  }

  private makeRequest() {
    const manager = new RequestManager(this.legitService, this.loadingService, this);
    manager.send(null);
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.makeRequest(), 0);
  }

  close(): void {
    this.dialogRef.close();
  }

  // IRequestHandler
  public complete(response: Response): void { }

  public success(response: Response): void {
    const items: any = response.json();
    this.usersLegit = items;
    for (const elt of items) {
      if (this.services.lastIndexOf(elt.service) < 0) {
        this.services.push(elt.service);
      }
    }
  }

  public afterSuccess(response: Response): void { }
  public error(response: Response): void { }
}
