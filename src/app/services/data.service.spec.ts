import { of, throwError } from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';

import { City } from '../model/city';
import { Feedback } from '../model/feedback';
import { CityState } from '../state/state';
import { DataService } from './data.service';
import { RestService } from './rest.service';

describe('DataService', () => {
  const fakeOkResponse = { 'coord': { 'lon': 3.88, 'lat': 43.61 }, 'weather': [{ 'id': 800, 'main': 'Clear', 'description': 'clear sky', 'icon': '01n' }], 'base': 'stations', 'main': { 'temp': 5.62, 'pressure': 1010, 'humidity': 39, 'temp_min': 4, 'temp_max': 7 }, 'visibility': 10000, 'wind': { 'speed': 4.1, 'deg': 320 }, 'clouds': { 'all': 0 }, 'dt': 1548709200, 'sys': { 'type': 1, 'id': 6518, 'message': 0.004, 'country': 'FR', 'sunrise': 1548659076, 'sunset': 1548694257 }, 'id': 2992166, 'name': 'Montpellier', 'cod': 200 };
  const testCityId = 2992166;

  let service: DataService;
  let injectedRest: RestService;
  let injectedStore: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([CityState]),
        HttpClientTestingModule
      ],
      providers: [
        RestService,
        Store
      ]
    });
    service = TestBed.get(DataService);
    injectedRest = TestBed.get(RestService);
    injectedStore = TestBed.get(Store);
  });

  afterEach(() => {
    injectedStore.reset({});
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch data from rest service and dispatch it so store', () => {
    const restSpy = spyOn(injectedRest, 'getCity').and.returnValue(of(fakeOkResponse));
    const storeSpy = spyOn(injectedStore, 'dispatch').and.callThrough();

    service.getCity(123);

    expect(restSpy).toHaveBeenCalledTimes(1);
    expect(storeSpy).toHaveBeenCalledTimes(3);

    const actualCities = <City[]>injectedStore.selectSnapshot(store => store.state.cities);

    expect(actualCities.length).toEqual(1);
  });

  it('should not double fetch', () => {
    const restSpy = spyOn(injectedRest, 'getCity').and.returnValue(of(fakeOkResponse));
    const storeSpy = spyOn(injectedStore, 'dispatch').and.callThrough();

    service.getCity(2992166);
    expect(restSpy).toHaveBeenCalledTimes(1);
    expect(storeSpy).toHaveBeenCalledTimes(3);

    service.getCity(2992166);
    expect(restSpy).toHaveBeenCalledTimes(1);
    expect(storeSpy).toHaveBeenCalledTimes(4);
  });

  it('should dispatch error to store', () => {
    const errorResponse = new HttpErrorResponse({
      error: { cod: '404', message: 'city not found' },
      status: 404,
      statusText: '404 Not Found'
    });

    const restSpy = spyOn(injectedRest, 'getCity').and.returnValue(throwError(errorResponse));
    service.getCity(2992166);

    expect(restSpy).toHaveBeenCalledTimes(1);

    const errorFeedback = <Feedback>injectedStore.selectSnapshot(store => store.state.feedbacks);
    expect(errorFeedback).toBeTruthy();
    expect(errorFeedback.error).toBeTruthy();
    expect(errorFeedback.error.isError).toBeTruthy();
    expect(errorFeedback.error.errorMessage).toBeTruthy();
    expect(errorFeedback.error.errorMessage).toEqual('city not found');
  });

  it('should remove city from store', () => {
    let actualCities = <City[]>injectedStore.selectSnapshot(store => store.state.cities);
    const storeSpy = spyOn(injectedStore, 'dispatch').and.callThrough();
    spyOn(injectedRest, 'getCity').and.returnValue(of(fakeOkResponse));

    expect(actualCities.length).toEqual(0);
    expect(storeSpy).toHaveBeenCalledTimes(0);

    service.getCity(testCityId);
    actualCities = <City[]>injectedStore.selectSnapshot(store => store.state.cities);
    expect(actualCities.length).toEqual(1);
    expect(storeSpy).toHaveBeenCalledTimes(3);

    service.removeCity(testCityId);
    actualCities = <City[]>injectedStore.selectSnapshot(store => store.state.cities);
    expect(actualCities.length).toEqual(0);
    expect(storeSpy).toHaveBeenCalledTimes(4);
  });
});
