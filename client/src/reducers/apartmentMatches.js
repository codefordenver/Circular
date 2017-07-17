import { APARTMENT_MATCHES_REQUEST, APARTMENT_MATCHES_SUCCESS, APARTMENT_MATCHES_FAILURE } from '../constants/apartments';

const defaultState = {
  loading: false,
  loaded: false,
  apartmentMatches: []
};

export default function(state = defaultState, action) {
  const { apartments } = action;
  switch (action.type) {
    case APARTMENT_MATCHES_REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case APARTMENT_MATCHES_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        apartments
      };
    case APARTMENT_MATCHES_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false
      };
    default:
      return state;
  }
}
