import { RoundToOnePipe } from './round-to-one.pipe';

describe('RoundToOnePipe', () => {
  let pipe: RoundToOnePipe;

  beforeEach(() => pipe = new RoundToOnePipe());

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should round arbitrary precision', () => {
    const data1 = '1.2';
    const data2 = '12.34';
    const data3 = '123.888';

    let actual: string;

    actual = pipe.transform(data1);
    expect(actual).toEqual('1');

    actual = pipe.transform(data2);
    expect(actual).toEqual('12');

    actual = pipe.transform(data3);
    expect(actual).toEqual('124');
  });
});
