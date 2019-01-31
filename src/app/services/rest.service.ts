import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RestService {

  constructor(private http: HttpClient) { }

  public getCity(cityId: number): Observable<any> {
    return this.http.get(`${environment.openweathermap.endpoint}?id=${cityId}&units=metric&APPID=${environment.openweathermap.token}`);
  }
}
