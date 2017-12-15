import { Component } from '@angular/core';

@Component({
  templateUrl: 'presentation.component.html',
})

export class PresentationComponent {
  features: [{}] = [
    {
      title: 'Progression',
      image: '../../../assets/images/graph.png',
      description: 'The game is divided in levels. Each new level corresponds to new threats.',
    },
    {
      title: 'Threats',
      image: '../../../assets/images/safebox.png',
      description: 'The game includes many tricks used by evil thinking hackers.',
    },
    {
      title: 'Leaderboard',
      image: '../../../assets/images/trophy.png',
      description: 'Compare your performance and scores to other players all around the world.',
    },
    {
      title: '3D',
      image: '../../../assets/images/3d.png',
      description: 'Navigate through a 3D environment to interact with all the game features.',
    },
    {
      title: 'Emails',
      image: '../../../assets/images/email.png',
      description: 'You will have to distinguish good emails from fraudulent ones.',
    },
    {
      title: 'Filesystem',
      image: '../../../assets/images/folder.png',
      description: 'The game uses a filesystem to reproduce your work environment.',
    },
    {
      title: 'Statistics',
      image: '../../../assets/images/presentation.png',
      description: 'Monitor your performances through time with advanced statistics.',
    },
    {
      title: 'Usb keys',
      image: '../../../assets/images/usb.png',
      description: 'Be careful with fraudulent USB keys and only use safe ones.',
    },
  ];
}
