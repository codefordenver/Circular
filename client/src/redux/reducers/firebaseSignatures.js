import {
  // FIREBASE FETCH SIGNATURE REQUESTS
  FETCH_FIREBASE_SIGNATURES_REQUEST,
  FETCH_FIREBASE_SIGNATURES_SUCCESS,
  // FIREBASE ADD SIGNATURES REQUESTS
  FIREBASE_ADD_SIGNATURE_TO_CAMPAIGN_REQUEST,
  FIREBASE_ADD_SIGNATURE_TO_CAMPAIGN_SUCCESS,
  FIREBASE_ADD_SIGNATURE_TO_CAMPAIGN_ERROR,
  // FIREBASE REMOVE SIGNATURE REQUEST
  FIREBASE_REMOVE_SIGNATURE_FROM_CAMPAIGN_REQUEST,
  FIREBASE_REMOVE_SIGNATURE_FROM_CAMPAIGN_SUCCESS,
  FIREBASE_REMOVE_SIGNATURE_FROM_CAMPAIGN_ERROR
} from '../actions/firebaseSignatures';

const inititalState = {
  loading: false,
  loaded: false
};

export default function firebaseSignaturesReducer(state = inititalState, action) {
  const { response, type } = action;
  switch (type) {
    case FETCH_FIREBASE_SIGNATURES_REQUEST:
      return {
        loading: true,
        loaded: false
      };
    case FETCH_FIREBASE_SIGNATURES_SUCCESS:
      return {
        loading: false,
        loaded: true,
        firebaseUserSignatures: response
      };
    case FIREBASE_ADD_SIGNATURE_TO_CAMPAIGN_REQUEST:
      return {
        ...state
      };
    case FIREBASE_ADD_SIGNATURE_TO_CAMPAIGN_SUCCESS:
      return {
        ...state
      };
    case FIREBASE_ADD_SIGNATURE_TO_CAMPAIGN_ERROR:
      return {
        ...state
      };
    case FIREBASE_REMOVE_SIGNATURE_FROM_CAMPAIGN_REQUEST:
      return {
        ...state
      };
    case FIREBASE_REMOVE_SIGNATURE_FROM_CAMPAIGN_SUCCESS:
      return {
        ...state
      };
    case FIREBASE_REMOVE_SIGNATURE_FROM_CAMPAIGN_ERROR:
      return {
        ...state
      };
    default:
      return state;
  }
}
