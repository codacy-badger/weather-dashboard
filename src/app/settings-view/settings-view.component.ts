import { Observable } from 'rxjs';

import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';

import { RemoveCity, UpdateFeedbacks } from '../actions/actions';
import { City } from '../model/city';
import { Feedback } from '../model/feedback';
import { RestService } from '../services/rest.service';
import { CityState } from '../state/state';

@Component({
  selector: 'app-settings-view',
  templateUrl: './settings-view.component.html',
  styleUrls: ['./settings-view.component.scss']
})
export class SettingsViewComponent {

  isSubmittable = false;

  @Select(CityState.getFeedbaks) feedbacks: Observable<Feedback>;
  @Select(CityState.getCities) cities: Observable<City[]>;

  constructor(private store: Store, private restService: RestService) { }

  addCity(id: string): void {
    document.getElementsByTagName('input')[0].value = null;
    this.typing();
    const userInput = parseInt(id.trim(), 10);
    return this.isNewCity(userInput)
      ? this.restService.getWeather(userInput)
      : null;
  }

  removeCity(cityIdToRemove: any): void {
    this.store.dispatch(new RemoveCity({
      cityId: cityIdToRemove
    }));
  }

  typing(value?: string) {
    this.isSubmittable = value !== undefined && value.length >= 6;
  }

  private isNewCity(userInput: number): boolean {
    const currentCities = <City[]>this.store.selectSnapshot(store => store.state.cities);
    const isNew = (currentCities.filter(c => c.cityId === userInput).length === 0);
    if (!isNew) this.store.dispatch(new UpdateFeedbacks({
      error: {
        isError: true,
        errorMessage: currentCities.filter(c => c.cityId === userInput)[0].name + ' is already present'
      }
    }));
    return isNew;
  }
}
