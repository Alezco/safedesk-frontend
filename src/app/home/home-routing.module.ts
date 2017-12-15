import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChangePassComponent } from './changepass/changepass-form.component';
import { ContactComponent } from './contact/contact.component';
import { FaqComponent } from './faq/faq.component';
import { ForgotPassComponent } from './forgotpass/forgotpass-form.component';
import { HomeComponent } from './home.component';
import { LoginFormComponent } from './login/login-form.component';
import { PresentationComponent } from './presentation/presentation.component';
import { RegisterFormComponent } from './register/register-form.component';
import { TeamComponent } from './team/team.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: PresentationComponent,
      },
      {
        path: 'login',
        component: LoginFormComponent,
      },
      {
        path: 'register',
        component: RegisterFormComponent,
      },
      {
        path: 'forgot-password',
        component: ForgotPassComponent,
      },
      {
        path: 'change-password/',
        component: ChangePassComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: 'team',
        component: TeamComponent,
      },
      {
        path: 'faq',
        component: FaqComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class HomeRoutingModule { }
