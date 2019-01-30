import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RestService {

  private endpoint = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather';
  private token = '9a75971df07ea2b05cdc712c57819d18';

  // http://api.openweathermap.org/data/2.5/weather?id=2992166&APPID=9a75971df07ea2b05cdc712c57819d18

  constructor(private http: HttpClient) { }

  public getCity(cityId: number): Observable<any> {
    return this.http.get(`${this.endpoint}?id=${cityId}&units=metric&APPID=${this.token}`);
  }
}
