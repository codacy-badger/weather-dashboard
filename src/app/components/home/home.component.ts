import { Observable } from 'rxjs';

import { Component } from '@angular/core';
import { Select } from '@ngxs/store';

import { City } from '../../model/city';
import { CityState } from '../../state/state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  @Select(CityState.getCities) cities: Observable<City[]>;

  constructor() {}
}
