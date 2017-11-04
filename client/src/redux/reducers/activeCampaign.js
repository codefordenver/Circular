import {
  FETCH_CAMPAIGN_REQUEST,
  FETCH_CAMPAIGN_SUCCESS,
  FETCH_CAMPAIGN_FAILURE
} from '../constants/activeCampaign';

const defaultState = {
  loading: false,
  loaded: false
};

export default function (state = defaultState, action) {
  const { response, error, type } = action;
  switch (type) {
    case FETCH_CAMPAIGN_REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case FETCH_CAMPAIGN_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        campaign: response.data[0]
      };
    case FETCH_CAMPAIGN_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error
      };
    default:
      return state;
  }
}
