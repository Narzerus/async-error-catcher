// @flow
import isFunction from 'lodash/isFunction';
import includes from 'lodash/includes';

const LOG_TYPES = ['error', 'warn', 'info'];

/**
 * Logs error objects to the console
 * @param {Error} error The error to log
 * @param {String} [logType='error'] Logging method to use.
 * Can be 'error', 'log', 'warn' or 'info'
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
 * Wraps an async function (any function that returns a promise) and
 * catches any error that bubble up from it.
 *
 * @param {Function} asyncFunction The async function to wrap
 * @param {Object} options
 * @param {Function} [options.handleError] Will be called when an error occurs.
 * If this is not passed it will default to logging the error in the console
 * @param {Object} [options.logType] Type of logging used to log to the console
 * @returns {Function} asyncFunction wrapped with a the catchAsync
 * functionality
 */
export default (asyncFunction, { handleError, logType } = {}) => async (
  ...args
) => {
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
