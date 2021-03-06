import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule, Store } from '@ngxs/store';

import { AppComponent } from './app.component';
import { TrimRoutePipe } from './pipes/trim-route.pipe';
import { CityState } from './state/state';

let fixture: ComponentFixture<AppComponent>;
let app: AppComponent;
let injectedStore: Store;

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgxsModule.forRoot([CityState]),
        BrowserAnimationsModule
      ],
      declarations: [
        AppComponent,
        TrimRoutePipe
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    injectedStore = TestBed.get(Store);
  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Weather Dashboard'`, () => {
    expect(app.title).toEqual('Weather Dashboard');
  });

  it('should render navbar', () => {
    const navlinks = fixture.debugElement.nativeElement.querySelectorAll('nav div a');

    expect(navlinks.length).toEqual(2);
    expect(navlinks[0].textContent).toEqual('Home');
    expect(navlinks[1].textContent).toEqual('Settings');
  });

  it('should dispatch navigation and clear errors', () => {
    const spyStore = spyOn(injectedStore, 'dispatch');

    app.navigateTo('home');

    expect(spyStore).toHaveBeenCalledTimes(2);
  });
});
