// @flow
import isFunction from 'lodash/isFunction';
import includes from 'lodash/includes';

const LOG_TYPES = ['error', 'warn', 'info'];
/**
 * Logs an error to the console
 *
 * @param {any} error The error to log
 * @param {string} [logType='error'] Determines what kind of logging
 * method should be used to log the error
 * @private
 */
function logError(error, logType = 'error') {
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
 * @param {any} asyncFunction
 * @param {Object} [options]
 * @param {Function} [options.handleError] if this function is provided
 * then catchAsync will call it instead of logging the error
 * @returns {Function} wrapped async function
 */
function catchAsync(asyncFunction, { handleError, logType } = {}) {
  return async (...args) => {
    try {
      await asyncFunction(...args);
    } catch (error) {
      if (isFunction(handleError)) {
        handleError(error);
        return;
      }

      logError(error, logType);
    }
  };
}

export default catchAsync;
