import createRequest from '../utils/createApiRequest';

export function fetchApartmentsApi() {
  return createRequest('/api/v1/apartments', 'GET', null);
}

export function fetchApartmentMatchesApi(latLng) {
  return createRequest('/api/v1/apartments/find', 'GET', latLng);
}
