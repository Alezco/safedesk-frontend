import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightPipe',
})
export class HighlightPipe implements PipeTransform {
  transform(text: string, filter: string): any {
    if (filter) {
      filter = filter.trim();
      text = text.replace(new RegExp('(' + filter + ')', 'gi'), '**$1**');
    }
    return text;
  }
}
