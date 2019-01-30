import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {
  let pipe: CapitalizePipe;

  let input: string;
  let actual: string;

  beforeEach(() => {
    input = null;
    actual = null;
    pipe = new CapitalizePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should capitalise', () => {
    input = 'dummy string';

    actual = pipe.transform(input);

    expect(actual).toEqual('Dummy string');
  });

  it('should handle null input', () => {
    actual = pipe.transform(null);

    expect(actual).toBeFalsy();
    expect(actual).toBeNull();
    expect(actual).not.toBeUndefined();
  });

  it('should handle undefined input', () => {
    actual = pipe.transform(undefined);

    expect(actual).toBeFalsy();
    expect(actual).toBeNull();
    expect(actual).not.toBeUndefined();
  });
});
