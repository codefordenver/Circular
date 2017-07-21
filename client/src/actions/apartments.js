import createApiRequest from '../utils/createApiRequest';

export function fetchApartmentsRequest() {
  return {
    type: 'APARTMENTS',
    promise: createApiRequest('apartments', 'GET')
  };
}

function searchGoogleForAddress(address, searchAddressHelper) {
  return {
    type: 'SEARCH_GOOGLE_FOR_ADDRESS',
    promise: searchAddressHelper(address)
  };
}

function getLatLong(place, latLngHelper) {
  return {
    type: 'GET_LAT_LNG',
    promise: latLngHelper(place)
  };
}

function fetchNearbyCampaigns(latLng) {
  return {
    type: 'APARTMENT_MATCHES',
    promise: createApiRequest('apartments/find', 'POST', latLng)
  };
}

export function searchAddressFlow(address, searchAddressHelper, latLngHelper) {
  return {
    type: 'SEARCH_ADDRESS_FLOW',
    promise: searchGoogleForAddress(address, searchAddressHelper)
      .then(results => getLatLong(results.response[0], latLngHelper))
      .then(latLng => fetchNearbyCampaigns(latLng.response))
      .catch(err => console.error(err))
  };
}
