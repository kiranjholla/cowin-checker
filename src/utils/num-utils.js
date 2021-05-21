import isEmpty from 'lodash/isEmpty.js';
import isNaN from 'lodash/isNaN.js';
import isNumber from 'lodash/isNumber.js';

// https://github.com/lodash/lodash/issues/1148#issuecomment-603841139
export function isNumeric(value) {
  // return /^[\+\-]?[0123456789]+(?:(?:e[0123456789]+)|(?:\.[0123456789]+))?$/.test(value);
  return !isNaN(Number(`${value}`))
}
