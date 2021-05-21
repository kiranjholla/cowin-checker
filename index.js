import { checkCowin } from './src/check-cowin.js';
import { isNumeric } from './src/utils/num-utils.js';

const [, , age, dose, district] = process.argv;

let error = '';

// Validate Age
if (!!age) {
  if (!isNumeric(age) || (+age !== 18 && +age !== 45)) {
    error = `${error}Invalid arguments! Invalid value provided for Age.\n`;
  }
}

// Validate District
if (!!district && !isNumeric(district)) {
  error = `${error}Invalid arguments! Invalid value provided for District.\n`;
}

// Validate Dose
if (!!dose) {
  if (!isNumeric(dose) || dose < 0 || dose >= 3) {
    error = `${error}Invalid arguments! Invalid value provided for Dose.\n`;
  }
}

if (error) {
  console.error(error);
} else {
  checkCowin(age, district, dose);
}
