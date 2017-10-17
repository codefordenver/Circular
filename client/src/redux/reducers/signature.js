import { ADD_SIGNATURE_TO_CAMPAIGN_REQUEST, ADD_SIGNATURE_TO_CAMPAIGN_SUCCESS, ADD_SIGNATURE_TO_CAMPAIGN_FAILURE } from '../constants/signature';

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
  }
}
