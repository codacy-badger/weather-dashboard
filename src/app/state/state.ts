import { Action, Selector, State, StateContext } from '@ngxs/store';

import { AddCity, ClearErrors, RemoveCity, UpdateFeedbacks } from '../actions/actions';
import { City } from '../model/city';
import { Feedback } from '../model/feedback';

export interface CityStateModel {
  cities: City[];
}

export interface FeedbacksModel {
  feedbacks: Feedback;
}

@State<CityStateModel>({
  name: 'state',
  defaults: { cities: [] }
})

@State<FeedbacksModel>({
  name: 'state',
  defaults: {
    feedbacks: {}
  }
})

export class CityState {

  @Selector()
  static getFeedbacks(state: FeedbacksModel): Feedback {
    return state.feedbacks;
  }

  @Selector()
  static getCities(state: CityStateModel): City[] {
    return state.cities;
  }

  @Action(AddCity)
  add({ getState, patchState }: StateContext<CityStateModel>, { payload }: AddCity) {
    const state = getState();
    patchState({ cities: [...state.cities, payload] });
  }

  @Action(RemoveCity)
  remove({ getState, patchState }: StateContext<CityStateModel>, { payload }: RemoveCity) {
    patchState({ cities: getState().cities.filter(a => a.cityId !== payload.cityId) });
  }

  @Action(UpdateFeedbacks)
  updateFeedbacks({ getState, patchState }: StateContext<FeedbacksModel>, { payload }: UpdateFeedbacks) {
    patchState({ feedbacks: payload });
  }

  @Action(ClearErrors)
  clearErrors({ getState, patchState }: StateContext<FeedbacksModel>, { }: ClearErrors) {
    patchState({ feedbacks: {} });
  }
}
