import { Observable } from 'rxjs';

import { Component } from '@angular/core';
import { Select } from '@ngxs/store';

import { City } from '../../model/city';
import { Feedback } from '../../model/feedback';
import { DataService } from '../../services/data.service';
import { CityState } from '../../state/state';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  @Select(CityState.getFeedbacks) feedbacks: Observable<Feedback>;
  @Select(CityState.getCities) cities: Observable<City[]>;

  constructor(private dataService: DataService) { }

  addCity(id: string | number): Observable<any> {
    const okInput = id.toString();
    document.getElementsByTagName('input')[0].value = null;
    const userInput = parseInt(okInput.trim(), 10);
    return this.isSubmittable(okInput)
      ? this.dataService.getCity(userInput)
      : null;
  }

  removeCity(cityId: number): Observable<any> {
    return this.dataService.removeCity(cityId);
  }

  isSubmittable(value?: string): boolean {
    return value !== undefined && value.length >= 6;
  }
}
