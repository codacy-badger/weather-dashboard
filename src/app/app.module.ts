import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NumberMaskDirective } from './directives/number-mask.directive';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { DayOrNightPipe } from './pipes/day-or-night.pipe';
import { RoundToOnePipe } from './pipes/round-to-one.pipe';
import { TrimRoutePipe } from './pipes/trim-route.pipe';
import { RestService } from './services/rest.service';
import { CityState } from './state/state';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingsComponent,
    NumberMaskDirective,
    RoundToOnePipe,
    TrimRoutePipe,
    DayOrNightPipe,
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([CityState]),
    NgxsReduxDevtoolsPluginModule.forRoot({disabled: environment.production}),
    NgxsLoggerPluginModule.forRoot({disabled: environment.production}),
    NgxsRouterPluginModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [RestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
