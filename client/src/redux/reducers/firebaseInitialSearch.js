import {
  // INITIAL SEARCH
  FIREBASE_STASH_ADDRESS,
  FIREBASE_STASH_LAT_LNG,
  CLEAR_INITIAL_SEARCH_RESULTS,
  // CHOOSE CAMPAIGN FROM OPTIONS
  FIREBASE_SELECT_INITIAL_SEARCH_ADDRESS,
  // NEARBY CAMPAIGNS
  FETCH_NEARBY_CAMPAIGNS_REQUEST,
  FETCH_NEARBY_CAMPAIGNS_SUCCESS,
  SET_EXACT_CAMPAIGN_MATCH
} from '../actions/firebaseInitialSearch';

const defaultState = {
  loading: false,
  loaded: false,
  searchedAddress: null,
  error: null,
  nearbyCampaigns: null
};

export default function (state = defaultState, action) {
  const { response, type } = action;
  switch (type) {
    case FIREBASE_SELECT_INITIAL_SEARCH_ADDRESS: {
      const selectedAddress =
        state.nearbyCampaigns.find(c => c.address === action.value) || action.value;
      return {
        ...state,
        selectedAddress,
        error: null
      };
    }
    case CLEAR_INITIAL_SEARCH_RESULTS: {
      return {
        ...state,
        ...defaultState
      };
    }
    case FIREBASE_STASH_ADDRESS:
      return {
        ...state,
        searchedAddress: response
      };
    case FIREBASE_STASH_LAT_LNG:
      return {
        ...state,
        latLng: response
      };
    case FETCH_NEARBY_CAMPAIGNS_REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case FETCH_NEARBY_CAMPAIGNS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        nearbyCampaigns: response
      };
    case SET_EXACT_CAMPAIGN_MATCH:
      return {
        ...state,
        loading: false,
        loaded: true,
        exactMatch: response
      };
    default:
      return state;
  }
}
