import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimRoute'
})
export class TrimRoutePipe implements PipeTransform {

  transform(value: string): any {
    return value
      ? value.substring(1)
      : null;
  }

}
