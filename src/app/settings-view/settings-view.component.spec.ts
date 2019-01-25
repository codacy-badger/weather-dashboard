import { Observable, of } from 'rxjs';

import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';

import { CapitalizePipe } from '../pipes/capitalize.pipe';
import { RestService } from '../services/rest.service';
import { CityState } from '../state/state';
import { SettingsViewComponent } from './settings-view.component';

describe('SettingsViewComponent', () => {
  const mockedResponse = JSON.parse('{"coord":{"lon":3.88,"lat":43.61},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"base":"stations","main":{"temp":9.62,"pressure":1012,"humidity":34,"temp_min":9,"temp_max":11},"visibility":10000,"wind":{"speed":1.5},"clouds":{"all":0},"dt":1548421200,"sys":{"type":1,"id":6518,"message":0.0035,"country":"FR","sunrise":1548400062,"sunset":1548434788},"id":2992166,"name":"Montpellier","cod":200}');

  const restServiceMock: Partial<RestService> = {
    getWeather: (cityId: number) => new Observable<any>()
  };

  let component: SettingsViewComponent;
  let fixture: ComponentFixture<SettingsViewComponent>;
  let store: Store;

  const montpellierId = '2992166';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SettingsViewComponent,
        CapitalizePipe
      ],
      imports: [
        HttpClientModule,
        NgxsModule.forRoot([CityState])],
      providers: [
        { provide: RestService, useValue: restServiceMock }
      ]
    })
      .compileComponents();

    store = TestBed.get(Store);
    fixture = TestBed.createComponent(SettingsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call collaborator services', () => {
    const mockedRestService = fixture.debugElement.injector.get(RestService);
    const restSpy = spyOn(mockedRestService, 'getWeather').and.returnValue({ subscribe: res => null });

    component.addCity(montpellierId);
    fixture.detectChanges();

    expect(restSpy).toHaveBeenCalledTimes(1);
  });
});
