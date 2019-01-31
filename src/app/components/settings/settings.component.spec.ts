import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';

import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { DataService } from '../../services/data.service';
import { CityState } from '../../state/state';
import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let injectedDataService: DataService;

  const montpellierId = 2992166;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SettingsComponent,
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

    fixture = TestBed.createComponent(SettingsComponent);
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
