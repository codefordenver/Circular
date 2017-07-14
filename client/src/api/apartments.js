import createRequest from '../utils/createApiRequest';

export default function fetchApartmentsApi() {
  return createRequest('/api/v1/apartments', 'GET', null);
}
