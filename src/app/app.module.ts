import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NumberMaskDirective } from './directives/number-mask.directive';
import { HomeViewComponent } from './home-view/home-view.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { DayOrNightPipe } from './pipes/day-or-night.pipe';
import { RoundToOnePipe } from './pipes/round-to-one.pipe';
import { TrimRoutePipe } from './pipes/trim-route.pipe';
import { RestService } from './services/rest.service';
import { SettingsViewComponent } from './settings-view/settings-view.component';
import { CityState } from './state/state';

@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    SettingsViewComponent,
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
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [RestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
