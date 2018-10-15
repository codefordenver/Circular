import initialState from '../initial-state.js';
import {
  // FIREBASE SIGN OUT
  FIREBASE_SIGN_OUT_REQUEST,
  FIREBASE_SIGN_OUT_SUCCESS,
  // FIREBASE SIGN IN
  FIREBASE_SIGN_IN_GOOGLE_REQUEST,
  FIREBASE_SIGN_IN_FACEBOOK_REQUEST,
  FIREBASE_SIGN_IN_SUCCESS,
  FIREBASE_SIGN_IN_FACEBOOK_ERROR,
  // FIREBASE FETCH USER SIGNED CAMPAIGNS
  FIREBASE_FETCH_USER_DATA_REQUEST,
  FIREBASE_FETCH_USER_DATA_SUCCESS,
  FIREBASE_FETCH_USER_DATA_ERROR
} from '../actions/firebaseAuth';

export default function authReducer(state = initialState.auth, action) {
  const { displayName, email, uid, response, type, error } = action;
  switch (type) {
    // FIREBASE SIGNOUT
    case FIREBASE_SIGN_OUT_REQUEST:
      return {
        ...state
      };
    case FIREBASE_SIGN_OUT_SUCCESS:
      return {
        ...initialState.auth,
        loading: false
      };
    // FIREBASE SIGN IN
    case FIREBASE_SIGN_IN_GOOGLE_REQUEST:
      return {
        status: 'AWAITING_GOOGLE_AUTH_RESPONSE'
      };
    case FIREBASE_SIGN_IN_FACEBOOK_REQUEST:
      return {
        status: 'AWAITING_FACEBOOK_AUTH_RESPONSE'
      };
    case FIREBASE_SIGN_IN_SUCCESS:
      return {
        ...state,
        displayName,
        email,
        status: 'SIGNED_IN',
        uid
      };
    case FIREBASE_SIGN_IN_FACEBOOK_ERROR:
      return {
        ...initialState.auth,
        loading: false,
        error
      };
    case FIREBASE_FETCH_USER_DATA_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FIREBASE_FETCH_USER_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        signedCampaignId: response.signedCampaignId || null,
        createdCampaignId: response.createdCampaignId || null
      };
    case FIREBASE_FETCH_USER_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: response
      };
    default:
      return state;
  }
}
