import { checkCowin } from './src/check-cowin.js';
import { isNumeric } from './src/utils/num-utils.js';

const [, , age, district] = process.argv;

let error = '';

// Validate Age
if (!age) {
  error = `${error}Invalid arguments! Age must be provided.\n`;
} else if (!isNumeric(age)) {
  error = `${error}Invalid arguments! Invalid value provided for Age.\n`;
}

// Validate District
if (!!district && !isNumeric(district)) {
  error = `${error}Invalid arguments! Invalid value provided for District.\n`;
}

if (error) {
  console.error(error);
} else {
  checkCowin(age, district);
}
