import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';

import { CityState } from '../state/state';
import { RestService } from './rest.service';

describe('RestService', () => {
  let service: RestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        NgxsModule.forRoot([CityState]),
      ],
      providers: [RestService]
    });
    service = TestBed.get(RestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
