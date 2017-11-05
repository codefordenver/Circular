import { loadState } from '../localStorage';
import {
  FETCH_NEARBY_CAMPAIGNS_REQUEST,
  FETCH_NEARBY_CAMPAIGNS_SUCCESS,
  FETCH_NEARBY_CAMPAIGNS_FAILURE,
  VALIDATE_ADDRESS_SUCCESS,
  VALIDATE_ADDRESS_FAILURE,
  CLEAR_SEARCH_RESULTS,
  SET_CAMPAIGN_INFORMATION,
  SELECT_ADDRESS,
  APARTMENTS_REQUEST,
  APARTMENTS_SUCCESS,
  APARTMENTS_FAILURE,
  CREATE_CAMPAIGN_FAILURE
} from '../constants/initialSearch';

const stateLoader = loadState();

let defaultState = {
  loading: false,
  loaded: false,
  searchedAddress: null,
  error: null,
  nearbyCampaigns: null
};

if (stateLoader) {
  defaultState = { error: null, ...stateLoader.initialSearch };
}

export default function (state = defaultState, action) {
  const { response, error, type } = action;
  switch (type) {
    case FETCH_NEARBY_CAMPAIGNS_REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case VALIDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        searchedAddress: response[0]
      };
    case VALIDATE_ADDRESS_FAILURE:
      return {
        error: {
          userMessage:
            "Sorry, we couldn't locate that address. Try selecting one of the auto-suggested addresses for better accuracy.",
          searchError: error
        }
      };
    case FETCH_NEARBY_CAMPAIGNS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        nearbyCampaigns: response.data,
        selectedAddress: response.data[0],
        error: null
      };
    case FETCH_NEARBY_CAMPAIGNS_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: {
          userMessage: 'Sorry, but something went wrong.',
          dbResponse: error
        }
      };
    case SELECT_ADDRESS: {
      const selectedAddress =
        state.nearbyCampaigns.find(c => c.address === action.value) || action.value;
      return {
        ...state,
        selectedAddress,
        error: null
      };
    }
    case 'STASH_ADDRESS':
      return {
        ...state,
        searchedAddress: action.address
      };
    case 'STASH_LAT_LNG':
      return {
        ...state,
        latLng: action.latLng
      };
    case CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        ...defaultState
      };
    case SET_CAMPAIGN_INFORMATION:
      return {
        ...state,
        campaignInfo: action.campaignInfo
      };
    case APARTMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case APARTMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        apartments: response.data
      };
    case APARTMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error
      };
    case CREATE_CAMPAIGN_FAILURE:
      return {
        ...state,
        searchedAddress: null,
        error
      };
    default:
      return state;
  }
}
