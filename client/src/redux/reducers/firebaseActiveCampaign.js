import {
  FIREBASE_FETCH_CAMPAIGN_BY_ID_REQUEST,
  FIREBASE_FETCH_CAMPAIGN_BY_ID_SUCCESS,
  FIREBASE_FETCH_CAMPAIGN_BY_ID_ERROR
} from '../actions/firebaseActiveCampaign';

const defaultState = {
  loading: false,
  loaded: false
};

export default function (state = defaultState, action) {
  const { response, error, type } = action;
  switch (type) {
    case FIREBASE_FETCH_CAMPAIGN_BY_ID_REQUEST:
      return {
        loading: true,
        loaded: false
      };
    case FIREBASE_FETCH_CAMPAIGN_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        ...response
      };
    case FIREBASE_FETCH_CAMPAIGN_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: true,
        error
      };
    // case FETCH_CAMPAIGN_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     loaded: false,
    //     error
    //   };
    // case CREATE_NEW_CAMPAIGN_REQUEST:
    //   return {
    //     ...state,
    //     loading: true,
    //     loaded: false
    //   };
    // case CREATE_NEW_CAMPAIGN_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     loaded: true,
    //     campaign: response
    //   };
    // case CREATE_NEW_CAMPAIGN_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     loaded: false,
    //     error
    //   };
    default:
      return state;
  }
}
