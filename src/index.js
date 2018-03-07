// @flow
import includes from 'lodash/includes';

type LogType = 'error' | 'warn' | 'info';
type CatchAsyncParams = {
  handleError?: (error: Error) => void,
  logType?: LogType,
};

const LOG_TYPES: Array<LogType> = ['error', 'warn', 'info'];

/**
 * Logs an error to the console
 *
 * @param {any} error The error to log
 * @param {string} [logType='error'] Determines what kind of logging
 * method should be used to log the error
 * @private
 */
function logError(error: Error, logType: LogType = 'error') {
  if (!includes(LOG_TYPES, logType)) {
    throw new Error(
      `catch-async: Error type provided "${logType}" is not valid`
    );
  }
  // eslint-disable-next-line no-console
  console.error(error);
}

/**
 * Returns an async function wrapped in a try catch function. It
 * will by default log any error thrown in the async function unless
 * a handleError function is provided. In that case it will instead
 * call handleError
 *
 * @export
 * @param {Function} asyncFunction
 * @param {Object} [options]
 * @param {Function} [options.handleError] if this function is provided
 * then catchAsync will call it instead of logging the error
 * @param {String} [options.logType='error'] determines what logging method
 * is used when an error is caught. Can be 'error', 'info', 'log' or 'warn'
 * @returns {Function} Wrapped async function
 */
function catchAsync(
  asyncFunction: (...args: Array<any>) => Promise<any>,
  { handleError, logType }: CatchAsyncParams = {}
) {
  return async (...args: Array<any>) => {
    try {
      await asyncFunction(...args);
    } catch (error) {
      if (typeof handleError === 'function') {
        handleError(error);
        return;
      }

      logError(error, logType);
    }
  };
}

export default catchAsync;
