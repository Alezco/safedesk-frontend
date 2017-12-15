import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { DialogComponent } from './new/mail-new-dialog.component';

@Component({
  selector: 'app-mail-center',
  templateUrl: 'mailcenter.component.html',
})

export class MailCenterComponent {
  emails: any[];
  reference: any;
  public dialog: MdDialog;

  constructor(dialog: MdDialog) {
    this.emails = [];
    this.reference = 'parent';
    this.dialog = dialog;
  }

  newMail(): void {
    const dialogRef: MdDialogRef<DialogComponent> = this.dialog.open(DialogComponent, {
      height: '90%', // can be px or %
      width: '60%', // can be px or %
    });
    dialogRef.componentInstance.subject = null;
    dialogRef.componentInstance.type = 'New Mail';
  }
}
