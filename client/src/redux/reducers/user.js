import {
  FETCH_SIGNED_CAMPAIGNS_REQUEST,
  FETCH_SIGNED_CAMPAIGNS_SUCCESS,
  FETCH_SIGNED_CAMPAIGNS_FAILURE
} from '../constants/user';

const defaultState = {
  loading: false,
  loaded: false
};

export default function (state = defaultState, action) {
  const { response, error, type } = action;
  switch (type) {
    case FETCH_SIGNED_CAMPAIGNS_REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case FETCH_SIGNED_CAMPAIGNS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        signedCampaign: response.data[0]
      };
    case FETCH_SIGNED_CAMPAIGNS_FAILURE:
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
