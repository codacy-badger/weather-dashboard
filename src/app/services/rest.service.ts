import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';

import { AddCity, ClearErrors, UpdateFeedbacks } from '../actions/actions';
import { City } from '../model/city';

@Injectable({
  providedIn: 'root',
})
export class RestService {

  private endpoint = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather';
  private token = '9a75971df07ea2b05cdc712c57819d18';

  // http://api.openweathermap.org/data/2.5/weather?id=2992166&APPID=9a75971df07ea2b05cdc712c57819d18

  constructor(private http: HttpClient, private store: Store) { }

  public getWeather(cityId: number) {
    this.store.dispatch(new UpdateFeedbacks({ isApiCallPending: true }));
    this.http.get(`${this.endpoint}?id=${cityId}&units=metric&APPID=${this.token}`)
      .subscribe(
        response => this.addCityToStore(response),
        error => this.store.dispatch(new UpdateFeedbacks({ error: { isError: true, errorMessage: error.error.message } })),
        () => this.store.dispatch(new ClearErrors())
      );
  }

  private addCityToStore(payload: any): Observable<City> {
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

}
