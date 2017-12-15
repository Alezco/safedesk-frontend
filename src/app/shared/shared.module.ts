import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { AchievementsService } from './services/request/achievements/achievements.service';
import { UnlockedAchievementsService } from './services/request/achievements/unlocked-achievements.service';
import { ChangePassService } from './services/request/auth/changepass.service';
import { ForgotPassService } from './services/request/auth/forgotpass.service';
import { LoginService } from './services/request/auth/login.service';
import { RegisterService } from './services/request/auth/register.service';
import { UsbBadService } from './services/request/babylon/usbbad.service';
import { UsbListService } from './services/request/babylon/usblist.service';
import { UsbToggleServiceBuilder } from './services/request/babylon/usbtoggle-builder.service';
import { UsbToggleUnPlugServiceBuilder } from './services/request/babylon/usbtoggle-unplug-builder.service';
import { UsbToggleUnPlugService } from './services/request/babylon/usbtoggle-unplug.service';
import { UsbToggleService } from './services/request/babylon/usbtoggle.service';
import { FilesystemSearchServiceBuilderService } from './services/request/filesystem/filesystem-search-service-builder-service';
import { FilesystemServiceBuilderService } from './services/request/filesystem/filesystem-service-builder-service';
import { LegitUser } from './services/request/gameinfo/legituser.service';
import { ContactService } from './services/request/home/contact.service';
import { LeaderboardService } from './services/request/leaderboard/leaderboard.service';
import { MailSetSpamBuilder } from './services/request/mails/mails-setSpam-builder.service';
import { MailsService } from './services/request/mails/mails.service';
import { MailsSentService } from './services/request/mails/mailsSent.service';
import { SetSpamService } from './services/request/mails/mailsSetSpam.service';
import { SpamMailService } from './services/request/mails/mailsSpams.service';
import { SendMailService } from './services/request/mails/sendMail.service';
import { ChangePasswordProfileService } from './services/request/profile/change-password-profile.service';
import { GetProfileService } from './services/request/profile/get-profile.service';
import { RemoveProfileService } from './services/request/profile/remove-profile.service';
import { UpdateInfoProfileService } from './services/request/profile/update-info-profile.service';
import { ScoreService } from './services/request/score/score.service';
import { ShopService } from './services/request/shop/shop.service';
import { StatService } from './services/request/stats/stats.service';
import { UserService } from './services/user/user.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [
    LoginService,
    RegisterService,
    UserService,
    ForgotPassService,
    ChangePassService,
    GetProfileService,
    RemoveProfileService,
    UpdateInfoProfileService,
    ChangePasswordProfileService,
    ContactService,
    MailsService,
    MailsSentService,
    FilesystemServiceBuilderService,
    SendMailService,
    StatService,
    FilesystemSearchServiceBuilderService,
    LegitUser,
    UsbBadService,
    UsbListService,
    UsbToggleService,
    UsbToggleServiceBuilder,
    UsbToggleUnPlugServiceBuilder,
    UsbToggleUnPlugService,
    ShopService,
    SpamMailService,
    MailSetSpamBuilder,
    SetSpamService,
    ScoreService,
    LeaderboardService,
    AchievementsService,
    UnlockedAchievementsService,
  ],
})
export class SharedModule { }
