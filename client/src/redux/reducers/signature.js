import {
  ADD_SIGNATURE_TO_CAMPAIGN_REQUEST,
  ADD_SIGNATURE_TO_CAMPAIGN_SUCCESS,
  ADD_SIGNATURE_TO_CAMPAIGN_FAILURE,
  FETCH_SIGNATURES_REQUEST,
  FETCH_SIGNATURES_SUCCESS,
  FETCH_SIGNATURES_FAILURE
} from '../constants/signature';

const defaultState = {
  loading: false,
  loaded: false
};

export default function (state = defaultState, action) {
  const { response, error, type } = action;
  switch (type) {
    case ADD_SIGNATURE_TO_CAMPAIGN_REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case ADD_SIGNATURE_TO_CAMPAIGN_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        campaign: response
      };
    case ADD_SIGNATURE_TO_CAMPAIGN_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error
      };
    case FETCH_SIGNATURES_REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case FETCH_SIGNATURES_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        signatures: response.data
      };
    case FETCH_SIGNATURES_FAILURE:
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
