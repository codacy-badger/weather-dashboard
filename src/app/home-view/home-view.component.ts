import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';

import { City } from '../model/city';
import { CityState } from '../state/state';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent {

  @Select(CityState.getCities) cities: Observable<City[]>;

  constructor() {}
}
