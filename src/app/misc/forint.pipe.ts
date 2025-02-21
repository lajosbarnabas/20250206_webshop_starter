import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'forint',
  standalone: true
})
export class ForintPipe implements PipeTransform {

  transform(value: string | number, ...args: unknown[]): string {
    return `${value.toString()} Ft`;
  }

}
