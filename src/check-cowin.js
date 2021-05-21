import axios from 'axios';

import { leftPad } from './utils/str-utils.js';

function responseHandler({ data }) {
  (data.centers || [])
    .filter(({ sessions }) => !!(sessions || []).filter(({ available_capacity: capacity }) => !!capacity).length)
    .forEach(center => console.log(center));
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

export function checkCowin() {
  const todayDate = new Date();
  const todayStr = `${todayDate.getDate()}-${leftPad(todayDate.getMonth() + 1, 2, 0, '0')}-${todayDate.getFullYear()}`;

  const district = 266;
  checkForDate(district, todayStr).then(responseHandler).catch(errorHandler);
}
