import initialState from '../initial-state.js';
import {
  // FIREBASE SIGN OUT
  FIREBASE_SIGN_OUT_REQUEST,
  FIREBASE_SIGN_OUT_SUCCESS,
  // FIREBASE SIGN IN
  FIREBASE_SIGN_IN_GOOGLE_REQUEST,
  FIREBASE_SIGN_IN_FACEBOOK_REQUEST,
  FIREBASE_SIGN_IN_SUCCESS,
  // FIREBASE FETCH USER SIGNED CAMPAIGNS
  FIREBASE_FETCH_USER_SIGNED_CAMPAIGNS_REQUEST,
  FIREBASE_FETCH_USER_SIGNED_CAMPAIGNS_SUCCESS
} from '../actions/firebaseAuth';

export default function authReducer(state = initialState.auth, action) {
  const { email, displayName, uid, type, signedCampaignId } = action;
  switch (type) {
    // FIREBASE SIGNOUT
    case FIREBASE_SIGN_OUT_REQUEST:
      return {
        ...state
      };
    case FIREBASE_SIGN_OUT_SUCCESS:
      return {
        status: 'ANONYMOUS',
        email: null,
        displayName: null,
        uid: null,
        signedCampaignId: null
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
        status: 'SIGNED_IN',
        email,
        displayName,
        uid
      };
    case FIREBASE_FETCH_USER_SIGNED_CAMPAIGNS_REQUEST:
      return {
        ...state
      };
    case FIREBASE_FETCH_USER_SIGNED_CAMPAIGNS_SUCCESS:
      return {
        ...state,
        signedCampaignId
      };
    default:
      return state;
  }
}
