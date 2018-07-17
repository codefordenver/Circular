import { CLEAR_SEARCH_RESULTS } from '../actions/firebaseInitialSearch';

const defaultState = {
  loading: false,
  loaded: false,
  searchedAddress: null,
  error: null,
  nearbyCampaigns: null
};

export default function (state = defaultState, action) {
  const { response, error, type } = action;
  switch (type) {
    case 'FIREBASE_STASH_ADDRESS':
      return {
        ...state,
        searchedAddress: response
      };
    case 'FIREBASE_STASH_LAT_LNG':
      return {
        ...state,
        latLng: response
      };
    case 'FETCH_NEARBY_CAMPAIGNS_REQUEST':
      return {
        ...state,
        loading: true
      };
    case 'FETCH_NEARBY_CAMPAIGNS_SUCCESS':
      return {
        ...state,
        loading: false,
        loaded: true,
        exactMatch: response
      };
    case 'SET_EXACT_CAMPAIGN_MATCH':
      return {
        ...state,
        loading: false,
        loaded: true,
        exactMatch: response
      };
    case 'SELECT_ADDRESS': {
      const selectedAddress =
        state.nearbyCampaigns.find(c => c.address === action.value) || action.value;
      return {
        ...state,
        selectedAddress,
        error: null
      };
    }
    case CLEAR_SEARCH_RESULTS: {
      return {
        ...defaultState
      };
    }
    default:
      return state;
  }
}
