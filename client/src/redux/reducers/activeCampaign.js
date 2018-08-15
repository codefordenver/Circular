import {
  FETCH_CAMPAIGN_REQUEST,
  FETCH_CAMPAIGN_SUCCESS,
  FETCH_CAMPAIGN_FAILURE
} from '../constants/activeCampaign';

import {
  CREATE_NEW_CAMPAIGN_REQUEST,
  CREATE_NEW_CAMPAIGN_SUCCESS,
  CREATE_NEW_CAMPAIGN_FAILURE
} from '../constants/newCampaign';

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
        // returns null to clear previous errors
        error: null,
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
    case CREATE_NEW_CAMPAIGN_REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case CREATE_NEW_CAMPAIGN_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        campaign: response
      };
    case CREATE_NEW_CAMPAIGN_FAILURE:
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
