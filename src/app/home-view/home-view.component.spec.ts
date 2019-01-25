import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';

import { DayOrNightPipe } from '../pipes/day-or-night.pipe';
import { RoundToOnePipe } from '../pipes/round-to-one.pipe';
import { CityState } from '../state/state';
import { HomeViewComponent } from './home-view.component';

describe('HomeViewComponent', () => {
  let component: HomeViewComponent;
  let fixture: ComponentFixture<HomeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeViewComponent,
        RoundToOnePipe,
        DayOrNightPipe
      ],
      imports: [
        NgxsModule.forRoot([CityState])

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
