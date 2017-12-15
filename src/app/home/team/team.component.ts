import { Component } from '@angular/core';

@Component({
  templateUrl: 'team.component.html',
})

export class TeamComponent {
  members: [{}] = [
    {
      title: 'Moray Baruh',
      image: '../../../assets/images/members/moray.jpg',
      description: 'Back-end developer working with databases. ' +
        'I study an apply a good application architecture on SafeDesk.',
    },
    {
      title: 'Victor Boissière',
      image: '../../../assets/images/members/victor.jpg',
      description: 'Full-stack developer, PHP and Laravel specialist. ' +
        'My work on SafeDesk is focused on Laravel and MySQL.',
    },
    {
      title: 'Benjamin Morali',
      image: '../../../assets/images/members/benjamin.jpg',
      description: 'Web and mobile developer, focused on front-end developpement. ' +
        'I use technologies such as Angular 4 and Bootstrap.',
    },
    {
      title: 'Hadrien de Lamotte',
      image: '../../../assets/images/members/hadrien.jpg',
      description: 'Web developer, specialised in 3D and iOS developpement. ' +
        'I work on SafeDesk 3D desktop using BabylonJS.',
    },
  ];
}
