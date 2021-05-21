import axios from 'axios';

import { leftPad } from './utils/str-utils.js';

function responseHandler(ageLimit) {
  return ({ data }) => {
    const availableSlots = (data.centers || [])
      .map(({ center_id: cId, name, fee_type: fee, sessions }) => ({
        cId,
        name,
        fee,
        sessions: sessions.filter(({ available_capacity, min_age_limit }) => !!available_capacity && min_age_limit <= ageLimit) || []
      }))
      .filter(({ sessions }) => sessions.length);

    if (availableSlots.length) {
      availableSlots.forEach(center => console.log(center));
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

export function checkCowin(age = 18, district = 266) {
  const todayDate = new Date();
  const todayStr = `${todayDate.getDate()}-${leftPad(todayDate.getMonth() + 1, 2, 0, '0')}-${todayDate.getFullYear()}`;

  checkForDate(district, todayStr).then(responseHandler(age)).catch(errorHandler);
}
