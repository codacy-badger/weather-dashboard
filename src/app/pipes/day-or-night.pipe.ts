import { Pipe, PipeTransform } from '@angular/core';

import { City } from '../model/city';

@Pipe({
  name: 'dayOrNight'
})
export class DayOrNightPipe implements PipeTransform {

  transform(value: Partial<City>): string {
    const current = (new Date()).getTime();
    return current > parseInt(value.time.sunrise, 10) * 1000 && current <= parseInt(value.time.sunset, 10) * 1000
      ? 'day'
      : 'night';  }

}
