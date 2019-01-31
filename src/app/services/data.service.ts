import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';

import { AddCity, ClearErrors, RemoveCity, UpdateFeedbacks } from '../actions/actions';
import { City } from '../model/city';
import { CityStateModel } from '../state/state';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private rest: RestService, private store: Store) { }

  public getCity(cityId: number): Observable<any> {
    if (!this.isCityNew(cityId)) return this.dispatchCityAlreadyPresent();
    this.store.dispatch(new UpdateFeedbacks({ isApiCallPending: true }));
    this.rest.getCity(cityId)
      .subscribe(
        payload => this.mapPayloadToStore(payload),
        error => this.mapErrorToStore(error),
        () => this.clearErrors()
      );
  }

  public removeCity(cityId: number): Observable<any> {
    return this.store.dispatch(new RemoveCity({
      cityId: cityId
    }));
  }

  private isCityNew(cityId: number): boolean {
    return !this.store.selectSnapshot<City[]>(store => store.state.cities).filter(c => c.cityId === cityId).length;
  }

  private mapPayloadToStore(payload: any): Observable<CityStateModel> {
    return this.store.dispatch(new AddCity({
      cityId: payload.id,
      name: payload.name,
      weather: {
        description: payload.weather[0].description,
        icon: payload.weather[0].icon,
        id: payload.weather[0].id,
        main: payload.weather[0].main,
        temperature: payload.main.temp,
        temp_max: payload.main.temp_max,
        temp_min: payload.main.temp_min
      },
      time: {
        sunrise: payload.sys.sunrise,
        sunset: payload.sys.sunset
      }
    }));
  }


  private mapErrorToStore(error: any): Observable<UpdateFeedbacks> {
    return this.store.dispatch(new UpdateFeedbacks({ error: { isError: true, errorMessage: error.error.message } }));
  }

  private dispatchCityAlreadyPresent(): Observable<UpdateFeedbacks> {
    return this.store.dispatch(new UpdateFeedbacks({error: {isError: true, errorMessage: 'City is already present!'}}));
  }

  private clearErrors(): Observable<ClearErrors> {
    return this.store.dispatch(new ClearErrors());
  }
}
