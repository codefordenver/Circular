import createApiRequest from '../utils/createApiRequest';

export function fetchApartmentsRequest() {
  return {
    type: 'APARTMENTS',
    promise: createApiRequest('apartments', 'GET')
  };
}

export function fetchApartmentMatchesRequest(latLng) {
  return {
    type: 'APARTMENT_MATCHES',
    promise: createApiRequest('apartments/find', 'POST', latLng)
  };
}
