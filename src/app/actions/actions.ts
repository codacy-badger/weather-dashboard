import { City } from '../model/city';
import { Feedback } from '../model/feedback';

export class AddCity {
  static readonly type = '[CITY] Add';

  constructor(public payload: City) { }
}

export class RemoveCity {
  static readonly type = '[CITY] Remove';

  constructor(public payload: City) { }
}

export class UpdateFeedbacks {
  static readonly type = '[FEEDBACKS] Update';

  constructor(public payload: Feedback) { }
}

export class ClearErrors {
  static readonly type = '[FEEDBACKS] Clear errors';

  constructor() { }
}
