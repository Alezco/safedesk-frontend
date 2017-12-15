import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-markdown',
  templateUrl: 'markdown.component.html',
})

export class MarkdownComponent {
  @Input('content') content: string;

  constructor() {
  }
}
