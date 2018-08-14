import {
  // CREATE NEW CAMPAIGN
  FIREBASE_CREATE_NEW_CAMPAIGN_REQUEST,
  FIREBASE_CREATE_NEW_CAMPAIGN_SUCCESS,
  // FETCH CAMPAIGNS
  FETCH_FIREBASE_CAMPAIGNS_REQUEST,
  FETCH_FIREBASE_CAMPAIGNS_SUCCESS,
  // POPULATE ACTIVE CAMPAIGN
  FIREBASE_POPULATE_ACTIVE_CAMPAIGN_REQUEST,
  FIREBASE_POPULATE_ACTIVE_CAMPAIGN_SUCCESS,
  // UPDATE CAMPAIGNS
  FIREBASE_UPDATE_CAMPAIGN_REQUEST,
  FIREBASE_UPDATE_CAMPAIGN_SUCCESS,
  FIREBASE_UPDATE_CAMPAIGN_ERROR
} from '../actions/firebaseCampaigns.js';

const inititalState = {
  loading: false,
  loaded: false
};

export default function firebaseCampaignReducer(state = inititalState, action) {
  const { response, type } = action;
  switch (type) {
    // CREATE NEW CAMPAIGNS
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
    case FIREBASE_UPDATE_CAMPAIGN_REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case FIREBASE_UPDATE_CAMPAIGN_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true
      };
    case FIREBASE_UPDATE_CAMPAIGN_ERROR:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: response
      };
    default:
      return state;
  }
}
