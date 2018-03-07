import { isFunction } from 'lodash';
import catchAsync from './index';

describe('catchAsync', () => {
  test('should return an asyncronous function', () => {
    const wrappedAsync = catchAsync(async () => {});
    expect(isFunction(wrappedAsync)).toBeTruthy();
    expect(wrappedAsync()).toBeInstanceOf(Promise);
  });

  test(
    'the wrapper function should call the asyncFunction passed function' +
      'with the arguments provided to it',
    () => {
      const mock = jest.fn(async () => {});
      const wrappedAsync = catchAsync(mock);
      wrappedAsync(100);
      expect(mock).toBeCalledWith(100);
    }
  );

  test('should throw errors from the asyncFunction', async () => {
    const consoleSpy = jest
      .spyOn(global.console, 'error')
      .mockImplementation(() => {});

    const testError = new Error('Some error');
    const mock = jest.fn(async () => {
      throw testError;
    });

    const wrappedAsync = catchAsync(mock);
    await expect(wrappedAsync()).resolves.toBeUndefined();
    expect(consoleSpy).toHaveBeenCalledWith(testError);
  });
});
