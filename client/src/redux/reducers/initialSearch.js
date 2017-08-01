import {
  FETCH_NEARBY_CAMPAIGNS_REQUEST,
  FETCH_NEARBY_CAMPAIGNS_SUCCESS,
  FETCH_NEARBY_CAMPAIGNS_FAILURE,
  VALIDATE_ADDRESS_SUCCESS,
  VALIDATE_ADDRESS_FAILURE,
  CLEAR_SEARCH_RESULTS,
  SET_CAMPAIGN_INFORMATION
} from '../constants/initialSearch';

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
          userMessage: "Sorry, we couldn't locate that address. Try selecting one of the auto-suggested addresses for better accuracy.",
          searchError: error
        }
      };
    case FETCH_NEARBY_CAMPAIGNS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        nearbyCampaigns: response
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
    default:
      return state;
  }
}
