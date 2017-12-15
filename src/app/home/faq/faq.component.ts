import { Component } from '@angular/core';

@Component({
  templateUrl: 'faq.component.html',
})

export class FaqComponent {
  list: [{}] = [
    {
      question: 'What is SafeDesk?',
      answer: 'SafeDesk is a serious game that helps you prepare to the security threats with a company. ' +
        'It reproduces the environment of a desktop computer to help you understand the security issues of an entreprise.',
    },
    {
      question: 'Who are the creators of SafeDesk?',
      answer: 'The creators of SafeDesk are Moray Baruh, Victor Boissière, Benjamin Morali, and Hadrien de Lamotte. ' +
        'We are web and mobile developers and students in EPITA, an engineering school.',
    },
    {
      question: 'Can I contact SafeDesk if I have any problem?',
      answer: 'Yes, you can contact them through the contact form that you can access from the website footer.',
    },
    {
      question: 'Can I log in or register with a Facebook or Google account?',
      answer: 'Yes you can! You can use Facebook login, Google login, or SafeDesk authentication. The login with a social ' +
        'network is faster because you don\'t need to enter your personal info, and your profile picture is automatically set.',
    },
    {
      question: 'What do I have access to once I am logged in?',
      answer: 'Once you are logged in, you have full access to SafeDesk. For now, this includes a 3D view reprensenting ' +
        'a desktop in an office, a virtual desktop, a mail client, and a virtual filesystem. More will come.',
    },
    {
      question: 'What technologies are used for this website?',
      answer: 'This web application uses Angular 4 for its front-end, and BabylonJS to display the 3D view. The back-end ' +
        'uses PHP with the framework Laravel, coupled with a MySQL database.',
    },
    {
      question: 'How do I play the game?',
      answer: 'When you arrive on the 3D view, you can interact with different elements. The most interesting one is ' +
        'the computer screen. By clicking on it, you will access the desktop. Once you\'re on it, you can access mails ' +
        'and a filesystem. When you open your mailbox, you will enter a "scenario" with people asking you information ' +
        'that you will find in the filesystem.',
    },
    {
      question: 'Can I upload my own files on the website?',
      answer: 'No you can\'t, but maybe this will be available in the future.',
    },
    {
      question: 'Can I use my company data to play the game?',
      answer: 'Not yet, but this will be included in the future.',
    },
    {
      question: 'Can I edit my personal info?',
      answer: 'Yes you can. Once you are connected, you can access through the top right corner a menu. From this menu, ' +
        'you can edit your personal info, which is relevant because it will be used in the game.',
    },
  ];
}
