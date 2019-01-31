import { Observable } from 'rxjs';

import { Component } from '@angular/core';
import { Navigate, RouterState } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';

import { ClearErrors } from './actions/actions';
import { fadeAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})
export class AppComponent {
  title = 'Weather Dashboard';

  @Select(RouterState.url) currentPage: Observable<string>;

  constructor(private store: Store) { }

  navigateTo = (where: string) => {
    this.store.dispatch(new ClearErrors());
    this.store.dispatch(new Navigate(['/' + where]));
  }
}
