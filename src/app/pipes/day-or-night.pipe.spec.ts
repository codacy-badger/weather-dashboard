import { DayOrNightPipe } from './day-or-night.pipe';

describe('DayOrNightPipe', () => {
  let pipe: DayOrNightPipe;

  let actual: string;

  beforeAll(() => {
    jasmine.clock().mockDate(new Date(949417100000));
  });

  beforeEach(() => {
    pipe = new DayOrNightPipe();
    actual = null;
  });

  it('create an instance', () => {
    pipe = new DayOrNightPipe();
    expect(pipe).toBeTruthy();
  });

  it('calculate day', () => {
    pipe = new DayOrNightPipe();
    actual = pipe.transform({ time: { sunrise: '949417000', sunset: '949417300' } });

    expect(actual).toEqual('day');
  });

  it('calculate night', () => {
    pipe = new DayOrNightPipe();
    actual = pipe.transform({ time: { sunrise: '949417300', sunset: '949417500' } });

    expect(actual).toEqual('night');
  });
});
