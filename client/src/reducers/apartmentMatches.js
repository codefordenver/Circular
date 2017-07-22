import { APARTMENT_MATCHES_REQUEST, APARTMENT_MATCHES_SUCCESS, APARTMENT_MATCHES_FAILURE } from '../constants/apartments';

const defaultState = {
  loading: false,
  loaded: false,
  apartmentMatches: []
};

export default function (state = defaultState, action) {
  const { response, error, type } = action;
  switch (type) {
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
        nearybyCampaigns: response
      };
    case APARTMENT_MATCHES_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: error.message
      };
    default:
      return state;
  }
}

