import isEmpty from 'lodash/isEmpty.js';
import isNaN from 'lodash/isNaN.js';
import isNumber from 'lodash/isNumber.js';

// https://github.com/lodash/lodash/issues/1148#issuecomment-603841139
export function isNumeric(value) {
  return isNumber(value) || (!isEmpty(value) && !isNaN(parseFloat(value)));
}
