import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MdButtonModule,
  MdCardModule,
  MdChipsModule,
  MdDialogModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdLineModule,
  MdListModule,
  MdMenuModule,
  MdTabsModule,
  MdToolbarModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

import {
  CovalentChipsModule,
  CovalentExpansionPanelModule,
  CovalentLayoutModule,
  CovalentLoadingModule,
  CovalentNotificationsModule,
  CovalentPagingModule,
  CovalentSearchModule,
  CovalentStepsModule,
} from '@covalent/core';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { HighlightPipe } from '../../shared/pipes/highlight.pipe';
import { TopLevelWindowManager } from '../../shared/services/window/window.service';
import { AchievementsComponent } from '../achievements/achievements.component';
import { AllAchievementsComponent } from '../achievements/all-achievements/all-achievements.component';
import { UnlockedAchievementsComponent } from '../achievements/unlocked-achievements/unlocked-achievements.component';
import { ShopItemComponent } from '../shop/shop-item/shop-item.component';
import { ShopComponent } from '../shop/shop.component';
import { StatComponent } from '../stats/stats.component';
import { BabylonComponent } from './babylon/babylon.component';
import { DialogLegitComponent } from './babylon/legit/legit-info.component';
import { DesktopComponent } from './desktop/desktop.component';
import { MarkdownComponent } from './entity/markdown/markdown.component';
import { SubwindowComponent } from './entity/subwindow/subwindow.component';
import { FilesystemSearchComponent } from './filesystem/filesystem-search/filesystem-search.component';
import { FilesystemComponent } from './filesystem/filesystem.component';
import { GameComponent } from './game.component';
import { MailCenterComponent } from './mailcenter/mailcenter.component';
import { MailItemComponent } from './mailcenter/mailitem/mail-item.component';
import { DialogComponent } from './mailcenter/new/mail-new-dialog.component';
import { MailSearchComponent } from './mailcenter/search/search.component';

@NgModule({
  declarations: [
    GameComponent,
    BabylonComponent,
    DesktopComponent,
    SubwindowComponent,
    MailCenterComponent,
    MailItemComponent,
    MailSearchComponent,
    DialogComponent,
    FilesystemComponent,
    FilesystemSearchComponent,
    StatComponent,
    AchievementsComponent,
    AllAchievementsComponent,
    UnlockedAchievementsComponent,
    HighlightPipe,
    MarkdownComponent,
    DialogLegitComponent,
    ShopItemComponent,
    ShopComponent,
  ],
  imports: [
    CovalentStepsModule,
    BrowserModule,
    FormsModule,
    MdGridListModule,
    MdDialogModule,
    MdTabsModule,
    MdListModule,
    MdLineModule,
    CovalentPagingModule,
    CovalentSearchModule,
    MdButtonModule,
    MdToolbarModule,
    CovalentExpansionPanelModule,
    MdInputModule,
    MdButtonModule,
    MdIconModule,
    MdToolbarModule,
    MdListModule,
    MdMenuModule,
    MdCardModule,
    CovalentLayoutModule,
    CovalentMarkdownModule,
    CovalentLoadingModule,
    MdChipsModule,
    CovalentChipsModule,
    CovalentNotificationsModule,
    NgxChartsModule,
    SimpleNotificationsModule.forRoot(),
  ],
  entryComponents: [
    DialogComponent,
    DialogLegitComponent,
  ],
  exports: [
    GameComponent,
    BabylonComponent,
    DesktopComponent,
    SubwindowComponent,
    MailCenterComponent,
    MailItemComponent,
    MailSearchComponent,
    DialogComponent,
    DialogLegitComponent,
    FilesystemComponent,
    StatComponent,
    MarkdownComponent,
  ],
  providers: [TopLevelWindowManager, HighlightPipe],
})
export class GameModule { }
