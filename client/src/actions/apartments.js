import { APARTMENTS_REQUEST } from '../constants/apartments';

export default function fetchApartmentsRequest() {
  return {
    type: APARTMENTS_REQUEST
  };
}
