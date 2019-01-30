import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';

import { CapitalizePipe } from '../pipes/capitalize.pipe';
import { DataService } from '../services/data.service';
import { CityState } from '../state/state';
import { SettingsViewComponent } from './settings-view.component';

describe('SettingsViewComponent', () => {
  let component: SettingsViewComponent;
  let fixture: ComponentFixture<SettingsViewComponent>;
  let injectedDataService: DataService;

  const montpellierId = 2992166;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SettingsViewComponent,
        CapitalizePipe
      ],
      imports: [
        HttpClientTestingModule,
        NgxsModule.forRoot([CityState]),
      ],
      providers: [
        DataService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsViewComponent);
    component = fixture.componentInstance;
    injectedDataService = TestBed.get(DataService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get new city from dataService', () => {
    const dataServiceSpy = spyOn(injectedDataService, 'getCity').and.callThrough();

    component.addCity(montpellierId);
    fixture.detectChanges();

    expect(dataServiceSpy).toHaveBeenCalledTimes(1);
  });

  it('should prevent unsubmittable requests', () => {
    const dataServiceSpy = spyOn(injectedDataService, 'getCity').and.callThrough();

    component.addCity(123);
    fixture.detectChanges();

    expect(dataServiceSpy).toHaveBeenCalledTimes(0);
  });

  it('should call dataService to remove city', () => {
    const dataServiceSpy = spyOn(injectedDataService, 'removeCity').and.callThrough();

    component.removeCity(montpellierId);
    fixture.detectChanges();

    expect(dataServiceSpy).toHaveBeenCalledTimes(1);
  });
});
