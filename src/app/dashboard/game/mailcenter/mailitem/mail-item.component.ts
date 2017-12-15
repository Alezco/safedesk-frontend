import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { Response } from '@angular/http';
import { MdDialog, MdDialogRef } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { IPageChangeEvent, TdLoadingService, TdPagingBarComponent } from '@covalent/core';
import { NotificationsService } from 'angular2-notifications/dist';
import * as _ from 'lodash';
import { MailModel } from '../../../../shared/models/mail';
import { UserModel } from '../../../../shared/models/user';
import { HighlightPipe } from '../../../../shared/pipes/highlight.pipe';
import { IRequestHandler, RequestManager } from '../../../../shared/request-manager';
import { MailSetSpamBuilder } from '../../../../shared/services/request/mails/mails-setSpam-builder.service';
import { MailsService } from '../../../../shared/services/request/mails/mails.service';
import { MailsSentService } from '../../../../shared/services/request/mails/mailsSent.service';
import { SpamMailService } from '../../../../shared/services/request/mails/mailsSpams.service';
import { GetProfileService } from '../../../../shared/services/request/profile/get-profile.service';
import { RequestService } from '../../../../shared/services/request/request.service';
import { DialogComponent } from '../new/mail-new-dialog.component';
import { Pagination } from './pagination';

class MailInfoHandler implements IRequestHandler {

  private mailItemComponent: MailItemComponent;

  constructor(mailItemComponent: MailItemComponent) {
    this.mailItemComponent = mailItemComponent;
  }

  public complete(response: Response): void { }

  public success(response: Response): void {
    this.mailItemComponent.fillProfileInfoForm(response);
  }

  public afterSuccess(response: Response): void { }

  public error(response: Response): void {
    this.mailItemComponent.processGetInfoError(response);
  }
}

@Component({
  selector: 'app-mail-item',
  templateUrl: 'mail-item.component.html',
})
export class MailItemComponent implements IRequestHandler, AfterViewInit {

  @Input('reference') reference: string;
  @ViewChild('pagingBar') pagingBar: TdPagingBarComponent;

  private refreshInterval = 60000;
  public notificationOptions: any;
  private cachedEmails: any[] = [];
  public emails: any[] = [];
  private emailsLength = 0;
  public me: UserModel;
  public filterString: string;
  private showNotif = false;

  private mailRequest: MailsService;
  private mailSentRequest: MailsSentService;
  private mailSpamRequest: SpamMailService;
  private currentMailRequest: RequestService;
  private notifications: NotificationsService;
  private loadingService: TdLoadingService;
  private highlightPipe: HighlightPipe;
  private getProfileService: GetProfileService;

  public pagination: Pagination = new Pagination();
  private dialog: MdDialog;
  private currType: string;

  private isNotification: boolean;
  private indexesToPush = [];
  public contentsList = [];
  public contents = [];
  private mailSetSpamBuilder: MailSetSpamBuilder;
  private isMarkedAsSpam: boolean;

  private lock: boolean;
  public sanitizer;

  constructor(mailService: MailsService, mailSentService: MailsSentService,
              loadingService: TdLoadingService, dialog: MdDialog,
              notifications: NotificationsService, highlightPipe: HighlightPipe,
              mailSpamRequest: SpamMailService, mailSetSpamBuilder: MailSetSpamBuilder,
              getProfileService: GetProfileService,
              sanitizer: DomSanitizer) {
    this.mailSetSpamBuilder = mailSetSpamBuilder;
    this.sanitizer = sanitizer;
    this.mailSpamRequest = mailSpamRequest;
    this.mailSentRequest = mailSentService;
    this.mailRequest = mailService;
    this.currentMailRequest = mailService;
    this.loadingService = loadingService;
    this.dialog = dialog;
    this.notifications = notifications;
    this.highlightPipe = highlightPipe;
    this.getProfileService = getProfileService;
    this.currType = '';
    this.lock = false;
    this.me = _.extend(new UserModel(), {
      email: 'Me',
    });
    this.me.avatar = this.me.avatar_url;
    this.notificationOptions = {
      position: ['top', 'right'],
      timeOut: 5000,
      showProgressBar: true,
    };
    this.isMarkedAsSpam = false;
    this.makeGetInfoRequest();
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.pagination.setPagingBar(this.pagingBar);
      this.loadEmails();
    }, 0);
  }

  public clearAllEmails(): void {
    this.currentMailRequest.resetEndpoint();
    this.cachedEmails = [];
    this.emails = [];
    this.pagination.reset();
  }

  public loadEmails(): void {
    if (!this.lock) {
      this.currType = 'emails';
      this.currentMailRequest = this.mailRequest;
      this.refreshEmails();
    }
  }

  public loadEmailsReplies(): void {
    if (!this.lock) {
      this.currType = 'emailsReply';
      this.currentMailRequest = this.mailSentRequest;
      this.refreshEmails();
    }
  }

  public loadEmailsSpams(): void {
    if (!this.lock) {
      this.currType = 'Spams';
      this.currentMailRequest = this.mailSpamRequest;
      this.refreshEmails();
    }
  }

  // Refresh button
  public refreshEmails(): void {
    if (!this.lock) {
      this.makeRequest(false);
    }
  }

  public refreshEmailsForNotification(): void {
    if (this.currType === 'Spams' || this.currType === 'emailsReply') {
    } else {
      this.makeRequest(true);
    }
  }

  private makeRequest(isNotification: boolean) {
    const endpoint = this.pagination.getEndpoint();
    if (endpoint !== null) {
      this.currentMailRequest.setEndpoint(endpoint);
    }
    this.isNotification = isNotification;
    const manager = new RequestManager(this.currentMailRequest, this.loadingService, this);
    manager.send(null);
  }

  public markAsSpam(mail: any) {
    const requestService = this.mailSetSpamBuilder.build(mail.id);
    const manager = new RequestManager(requestService, this.loadingService, this);
    this.isMarkedAsSpam = true;
    manager.send(null);
    const index = this.emails.indexOf(mail);
    if (index > -1) {
      this.emails.splice(index, 1);
    }
  }

  public filterEmailsByName(searchName = ''): void {
    this.filterString = searchName;
    this.emails = this.cachedEmails.filter((mail: MailModel, index: number) => {
      if (searchName === '') {
        this.contents = [];
        this.contents.push(mail.content);
      } else {
        let tmp: string;
        tmp = mail.content;
        this.filterString = searchName;
        tmp = this.highlightPipe.transform(tmp, this.filterString);
        this.contents = [];
        this.cachedEmails[index].contents.pop();
        this.cachedEmails[index].contents.push(tmp);
      }
      const tmp = mail.sender.email + ' ' + mail.subject + ' ' + mail.content;
      return tmp.toLowerCase().indexOf(searchName.toLowerCase()) > -1;
    });
  }

  public newMail(sender: UserModel, subject: string, replyId: number): void {
    const dialogRef: MdDialogRef<DialogComponent> = this.dialog.open(DialogComponent, {
      height: '70%', // can be px or %
      width: '60%', // can be px or %
    });
    const type = `Reply to ${sender.email}`;
    _.extend(dialogRef.componentInstance, { replyId, subject, type });
  }

  private updateShownEmails(): void {
    if (this.isNotification) {
      for (const elt of this.indexesToPush) {
        this.emails.splice(0, 0, elt);
      }
    } else {
      this.emails = this.pagination.filterData(this.cachedEmails);
    }
  }

  public paginationEvent(pagingEvent: IPageChangeEvent): void {
    this.pagination.update(pagingEvent);
    if (this.pagination.isServerRequestNeeded(this.cachedEmails)) {
      this.makeRequest(false);
    } else {
      this.updateShownEmails();
    }
  }

  public handleNotifications(email: any) {
    if (this.currType === 'Spams' || this.currType === 'emailsReply') {
    } else {
      this.notifications.success('New email', 'From: ' + email.sender.email);
    }
  }

  // IRequestHandler
  public complete(response: Response): void { }
  public success(response: Response): void { }
  public error(response: Response): void { }
  public expandedEvent(): void { }
  public collapsedEvent(): void { }

  public afterSuccess(response: Response) {
    this.lock = true;
    let emails;
    if (this.isMarkedAsSpam) {
      this.lock = false;
      this.isMarkedAsSpam = false;
      return;
    }
    try {
      emails = response.json();
    } catch (e) {
      return;
    }
    const max = this.cachedEmails.length;
    if (!this.isNotification) {
      this.clearAllEmails();
    }
    this.cachedEmails = [];
    this.indexesToPush = [];
    this.contentsList = [];
    let count = 0;
    emails.data.forEach((email) => {
      if (email.html) {
        email.content = this.sanitizer.bypassSecurityTrustHtml(email.content);
      }
      const fetchedEmail = _.defaults(_.extend(new MailModel(), email), { sender: this.me });
      Object.assign(fetchedEmail, { contents: [email.content] });
      this.cachedEmails.push(fetchedEmail);
      if (count > max - 1) {
        this.indexesToPush.push(this.cachedEmails[this.cachedEmails.length - count - 1]);
      }
      count++;
      this.contentsList.push(email);
    });
    this.pagination.setServerTotal(emails.total);
    this.pagination.setEndpoint(emails.next_page_url);
    this.updateShownEmails();
    if (emails.total > this.emailsLength && this.showNotif) {
      this.handleNotifications(this.emails[this.emails.length - 1]);
    }
    this.emailsLength = emails.total;
    this.showNotif = this.currentMailRequest !== this.mailSentRequest;
    this.lock = false;
    this.pagination.reset();
    this.currentMailRequest.resetEndpoint();
  }

  private makeGetInfoRequest(): void {
    const handler = new MailInfoHandler(this);
    const manager = new RequestManager(this.getProfileService, this.loadingService, handler);
    manager.send(null);
  }

  public fillProfileInfoForm(response: Response) {
    this.me.avatar = response.json().avatar_url;
  }

  public processGetInfoError(response: Response) {
    console.error(response);
  }
}
