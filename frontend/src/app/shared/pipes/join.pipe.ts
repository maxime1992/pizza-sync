import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join',
})
export class JoinPipe implements PipeTransform {
  transform(arr: any[], nameToPluck: string): any {
    if (!arr) {
      return '';
    }

    return arr
      .filter(x => typeof x !== 'undefined')
      .map(x => x[nameToPluck])
      .join(', ');
  }
}
