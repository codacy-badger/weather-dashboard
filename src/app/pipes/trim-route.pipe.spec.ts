import { TrimRoutePipe } from './trim-route.pipe';

describe('TrimRoutePipe', () => {
  let pipe: TrimRoutePipe;
  let input: string;
  let actual: string;

  beforeEach(() => {
    input = null;
    actual = null;
    pipe = new TrimRoutePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should trim', () => {
    input = '/route';

    actual = pipe.transform(input);

    expect(actual).toEqual('route');
  });

  it('should handle null value', () => {
    actual = pipe.transform(null);

    expect(actual).toBeFalsy();
    expect(actual).toBeNull();
    expect(actual).not.toBeUndefined();
  });

  it('should handle undefined value', () => {
    actual = pipe.transform(undefined);

    expect(actual).toBeFalsy();
    expect(actual).toBeNull();
    expect(actual).not.toBeUndefined();
  });
});
