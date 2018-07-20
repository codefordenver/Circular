import {
  // FETCH CAMPAIGNS
  FETCH_FIREBASE_CAMPAIGNS_REQUEST,
  FETCH_FIREBASE_CAMPAIGNS_SUCCESS,
  // POPULATE ACTIVE CAMPAIGN
  FIREBASE_POPULATE_ACTIVE_CAMPAIGN_REQUEST,
  FIREBASE_POPULATE_ACTIVE_CAMPAIGN_SUCCESS,
  // CREATE NEW CAMPAIGN
  FIREBASE_CREATE_NEW_CAMPAIGN_REQUEST,
  FIREBASE_CREATE_NEW_CAMPAIGN_SUCCESS
} from '../actions/firebaseCampaigns.js';

const inititalState = {
  loading: false,
  loaded: false
};

export default function firebaseSignaturesReducer(state = inititalState, action) {
  const { response, type } = action;
  switch (type) {
    // FETCH CAMPAIGNS
    case FETCH_FIREBASE_CAMPAIGNS_REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case FETCH_FIREBASE_CAMPAIGNS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        campaigns: response.firebaseCampaigns,
        campaignsAddresses: response.firebaseCampaignsAddresses
      };
    // POPULATE ACTIVE CAMPAIGN
    case FIREBASE_POPULATE_ACTIVE_CAMPAIGN_REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case FIREBASE_POPULATE_ACTIVE_CAMPAIGN_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        activeCampaign: response
      };
    case FIREBASE_CREATE_NEW_CAMPAIGN_REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case FIREBASE_CREATE_NEW_CAMPAIGN_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        newlyCreatedCampaign: response
      };
    default:
      return state;
  }
}
