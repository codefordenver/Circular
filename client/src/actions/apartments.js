import { APARTMENTS_REQUEST, APARTMENT_MATCHES_REQUEST } from '../constants/apartments';

export function fetchApartmentsRequest() {
  return {
    type: APARTMENTS_REQUEST
  };
}

export function fetchApartmentMatchesRequest(data) {
  return {
    type: APARTMENT_MATCHES_REQUEST,
    data: data
  };
}
