import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundToOne'
})
export class RoundToOnePipe implements PipeTransform {

  transform(value: string): string {
    return Number.parseFloat(value).toFixed(0);
  }
}
