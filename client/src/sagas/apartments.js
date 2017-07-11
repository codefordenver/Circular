import { takeLatest, call, put} from 'redux-saga/effects';
import NodeGeocoder from 'geocoder';

import { APARTMENTS_REQUEST, APARTMENTS_SUCCESS, APARTMENTS_FAILURE } from '../constants/apartments';

import fetchApartmentsApi from '../api/apartments';

// Used to map the response of the API request for the apartments
const mapApartmentsResponse = (apartmentRecords) => {
  const markers = [];
  return apartmentRecords.map(record => {
    return NodeGeocoder.geocode(record.street_address, (err, geoCodedAddress) => {
      const location = geoCodedAddress.results[0].geometry.location
      return markers.push({
        key: record.id,
        position: {
          lat: location.lat,
          lng: location.lng
        },
        defaultAnimation: 2
      });
    });
  });
};

function* apartmentsFlow(action) {
  try {
    const response = yield call(fetchApartmentsApi);
    const apartments = yield call(mapApartmentsResponse, response);
    yield put({
      type: APARTMENTS_SUCCESS,
      apartments
    });
  } catch (e) {
    yield put({
      type: APARTMENTS_FAILURE,
      e
    });
  }
}


function* apartmentsWatcher() {
  yield takeLatest(APARTMENTS_REQUEST, apartmentsFlow);
}

export default apartmentsWatcher;
