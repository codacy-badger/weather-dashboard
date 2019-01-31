import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';

import { DayOrNightPipe } from '../../pipes/day-or-night.pipe';
import { RoundToOnePipe } from '../../pipes/round-to-one.pipe';
import { CityState } from '../../state/state';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        RoundToOnePipe,
        DayOrNightPipe
      ],
      imports: [
        NgxsModule.forRoot([CityState])
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
