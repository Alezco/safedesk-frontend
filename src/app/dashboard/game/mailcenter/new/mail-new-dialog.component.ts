import { AfterContentInit, Component } from '@angular/core';
import { Response } from '@angular/http';
import { MdDialogRef } from '@angular/material';
import { TdLoadingService } from '@covalent/core';
import { Form } from '../../../../shared/forms/form';
import { FormObjectSendMail } from '../../../../shared/forms/mails/Form-object-send-mail';
import { SendMailService } from '../../../../shared/services/request/mails/sendMail.service';
import { SubwindowType } from '../../entity/subwindow/subwindow.component';

@Component({
  selector: 'app-dialog-example',
  templateUrl: 'mail-new-dialog.component.html',
})

export class DialogComponent extends Form implements AfterContentInit {
  public SubwindowType = SubwindowType;
  emailList: string[] = [
    'a.a@a.fr',
    'b.b@b.fr',
    'c.c@c.fr',
  ];
  attachmentList: any[] = [];
  replyId: number;
  subject: string;
  type: string;
  readOnly: boolean;
  model: string[] = [];
  isFileDialogOpen: boolean;
  attachmentTitle = 'Choose an attachment';
  public dialogRef: MdDialogRef<any>;

  constructor(sendMailService: SendMailService,
              loadingService: TdLoadingService,
              dialogRef: MdDialogRef<any>) {
    super(sendMailService, loadingService, new FormObjectSendMail());
    this.dialogRef = dialogRef;
    this.isFileDialogOpen = false;
  }

  ngAfterContentInit(): void {
    const sender = this.type.split(' ')[2];
    if (sender) {
      this.emailList.push(sender);
      this.model.push(sender);
    }
    this.formObject.subject = this.subject;
  }

  sendMail() {
    this.formObject.email_id = this.replyId;
    this.formObject.receivers = this.model;
    this.submit();
  }

  public complete(response: Response): void {
    this.hasErrors = response.status !== 200;
    if (this.hasErrors) {

    } else {
      this.dialogRef.close();
    }
  }

  public afterSuccess(response: Response): void {
    this.dialogRef.close();
  }

  public addAttachment(): void {
    this.removeTopLevel();
  }

  public removeTopLevel(): void {
    this.isFileDialogOpen = !this.isFileDialogOpen;
  }

  public OpenDoc(event: any) {
    if (this.attachmentList.length > 0) {
      this.attachmentList = [];
    }
    this.attachmentList.push(event.filename);
    this.removeTopLevel();
    this.formObject.file_id = event.id;
  }
}
