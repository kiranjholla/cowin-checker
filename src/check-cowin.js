import axios from 'axios';
import startCase from 'lodash/startCase.js';
import { printRow } from './utils/print-utils.js';
import { leftPad, strPad } from './utils/str-utils.js';

const columns = [
  { key: 'name', length: 35, align: 'left' },
  { key: 'fee', length: 6, align: 'left' },
  { key: 'date', length: 12, align: 'right' },
  { key: 'vaccine', length: 15, align: 'left' },
  { key: 'age', length: 5, align: 'right' },
  { key: 'dose1', length: 8, align: 'right' },
  { key: 'dose2', length: 8, align: 'right' }
];

function printHeader() {
  console.log(
    columns.reduce((hdrStr, col) => `${hdrStr}${strPad(startCase(col.key), col.length, 1, ' ', 'right')}`, '')
  );
  console.log(new Array(columns.reduce((a, b) => a + b.length, 1)).join('='));
}

function printCenter(center) {
  printRow(center, columns);
}

function responseHandler(ageLimit, doseNumber) {
  let filterPredicate;

  if (!doseNumber) {
    filterPredicate = ({ available_capacity, min_age_limit }) => !!available_capacity && min_age_limit <= ageLimit;
  } else {
    filterPredicate = session => !!session[`available_capacity_dose${doseNumber}`] && session.min_age_limit <= ageLimit;
  }

  return ({ data }) => {
    const availableSlots = (data.centers || [])
      .reduce(
        (collated, { name, fee_type: fee, sessions }) => [
          ...collated,
          ...sessions
            .filter(filterPredicate)
            .map(({ date, min_age_limit: age, vaccine, available_capacity_dose1: dose1, available_capacity_dose2: dose2 }) => {
              const [day, month, year] = date.split('-');
              return {
                name,
                fee,
                date,
                dateNum: new Date(year, month, day).getTime(),
                vaccine,
                age: `${age}+`,
                dose1,
                dose2
              };
            })
        ],
        []
      )
      .sort((a, b) => {
        const dateSort = a.dateNum - b.dateNum;
        if (dateSort === 0) {
          if (a.name < b.name) return -1;
          if (b.name < a.name) return 1;
          return 0;
        } else {
          return dateSort;
        }
      });

    if (availableSlots.length) {
      printHeader();
      availableSlots.forEach(printCenter);
    } else {
      console.log(`Found no slots for age limit: ${ageLimit}+`);
    }
  };
}

function errorHandler(e) {
  console.log(e);
}

function checkForDate(district, date) {
  return axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${district}&date=${date}`, {
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-US,en;q=0.5',
      Origin: 'https://www.cowin.gov.in/',
      Referer: 'https://www.cowin.gov.in/',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0'
    }
  });
}

export function checkCowin(age = 18, district = 266, dose) {
  const todayDate = new Date();
  const todayStr = `${todayDate.getDate()}-${leftPad(todayDate.getMonth() + 1, 2, 0, '0')}-${todayDate.getFullYear()}`;

  checkForDate(district, todayStr).then(responseHandler(age, dose)).catch(errorHandler);
}
