import { Observable } from 'rxjs';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';

import { CityState } from '../state/state';
import { RestService } from './rest.service';

describe('RestService', () => {
  let actual: Observable<any>;
  let service: RestService;
  let httpMock: HttpTestingController;

  const fakeResponse = '{"coord":{"lon":3.88,"lat":43.61},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"base":"stations","main":{"temp":5.62,"pressure":1010,"humidity":39,"temp_min":4,"temp_max":7},"visibility":10000,"wind":{"speed":4.1,"deg":320},"clouds":{"all":0},"dt":1548709200,"sys":{"type":1,"id":6518,"message":0.004,"country":"FR","sunrise":1548659076,"sunset":1548694257},"id":2992166,"name":"Montpellier","cod":200}';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        NgxsModule.forRoot([CityState]),
        HttpClientTestingModule
      ],
      providers: [RestService]
    });
    service = TestBed.get(RestService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    actual = null;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the correct endpoint', () => {
    const expectedEndpoint = 'https://api.openweathermap.org/data/2.5/weather?id=2992166&units=metric&APPID=9a75971df07ea2b05cdc712c57819d18';

    actual = service.getCity(2992166);
    expect(actual).toBeTruthy();
    expect(actual.constructor.name).toEqual('Observable');

    actual.subscribe(c => {
      expect(c).toBeTruthy();
      expect(c).toEqual(fakeResponse);
    });

    const req = httpMock.expectOne(expectedEndpoint);
    expect(req.request.method).toEqual('GET');
    req.flush(fakeResponse);
  });
});
