import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
})

export class HomeComponent {
  menuLinks: [{}] = [
    {
      name: 'Presentation',
      description: 'Homepage',
      url: '/presentation',
      icon: 'view_headline',
    },
    {
      name: 'Login',
      description: 'Login',
      url: '/login',
      icon: 'person',
    },
    {
      name: 'Register',
      description: 'Create an account',
      url: '/register',
      icon: 'person_add',
    },
  ];

  constructor(userService: UserService, router: Router) {
    if (userService.isUserConnected()) {
      router.navigate(['/dashboard']);
    }
  }
}
