import createApiRequest from '../utils/createApiRequest';

export function fetchApartmentsRequest() {
  return {
    type: 'APARTMENTS',
    promise: createApiRequest('apartments', 'GET')
  };
}

function searchGoogleForAddress(address, searchAddressHelper) {
  return searchAddressHelper(address);
}

function getLatLong(place, latLngHelper) {
  return latLngHelper(place);
}

function fetchNearbyCampaigns(latLng) {
  return createApiRequest(`apartments/find?lat=${latLng.lat}&lng=${latLng.lng}`, 'GET');
}

export function searchAddressFlow(address, searchAddressHelper, latLngHelper) {
  return {
    type: 'APARTMENT_MATCHES',
    promise: searchGoogleForAddress(address, searchAddressHelper)
      .then(results => getLatLong(results[0], latLngHelper))
      .then(latLng => fetchNearbyCampaigns(latLng))
  };
}
