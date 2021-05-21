import axios from 'axios';

function responseHandler({ data }) {
  (data.centers || []).forEach(center => console.log(center));
}

function errorHandler(e) {
  console.log(e);
}

export function checkCowin() {
  axios
    .get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=266&date=21-05-2021`, {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.5',
        Origin: 'https://www.cowin.gov.in/',
        Referer: 'https://www.cowin.gov.in/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0'
      }
    })
    .then(responseHandler)
    .catch(errorHandler);
}
