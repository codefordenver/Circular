import {
  // Firbase fetch signatures
  FETCH_FIREBASE_SIGNATURES_REQUEST,
  FETCH_FIREBASE_SIGNATURES_SUCCESS,
  // Firebase add signature
  FIREBASE_ADD_SIGNATURE_TO_CAMPAIGN_REQUEST,
  FIREBASE_ADD_SIGNATURE_TO_CAMPAIGN_SUCCESS,
  FIREBASE_ADD_SIGNATURE_TO_CAMPAIGN_ERROR,
  // Firebase admin add signature
  FIREBASE_ADMIN_ADD_SIGNATURE_REQUEST,
  FIREBASE_ADMIN_ADD_SIGNATURE_SUCCESS,
  FIREBASE_ADMIN_ADD_SIGNATURE_ERROR,
  // Firebase remove signature
  FIREBASE_REMOVE_SIGNATURE_FROM_CAMPAIGN_REQUEST,
  FIREBASE_REMOVE_SIGNATURE_FROM_CAMPAIGN_SUCCESS,
  FIREBASE_REMOVE_SIGNATURE_FROM_CAMPAIGN_ERROR
} from '../actions/firebaseSignatures';

const inititalState = {
  loading: false,
  loaded: false
};

export default function firebaseSignaturesReducer(state = inititalState, action) {
  const { error, response, type } = action;
  switch (type) {
    // Firbase fetch signatures
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
    // Firebase add signatures
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
    // firebase admin add signature
    case FIREBASE_ADMIN_ADD_SIGNATURE_REQUEST:
      return {
        ...state,
        error: null,
        loading: true
      };
    case FIREBASE_ADMIN_ADD_SIGNATURE_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false
      };

    case FIREBASE_ADMIN_ADD_SIGNATURE_ERROR:
      return {
        ...state,
        error
      };
    // Firebase remove signature from campaign
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
