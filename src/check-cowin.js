import axios from 'axios';

function responseHandler({ data }) {
  (data.centers || []).forEach(center => console.log(center));
}

function errorHandler(e) {
  console.log(e);
}

export function checkCowin() {
  axios
    .get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=266&date=21-05-2021`)
    .then(responseHandler)
    .catch(errorHandler);
}
