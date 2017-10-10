import { ADD_SIGNATURE_TO_PETITION_REQUEST, ADD_SIGNATURE_TO_PETITION_SUCCESS, ADD_SIGNATURE_TO_PETITION_FAILURE } from '../constants/petition';

const defaultState = {
  loading: false,
  loaded: false
};

export default function (state = defaultState, action) {
  const { response, error, type } = action;
  switch (type) {
    case ADD_SIGNATURE_TO_PETITION_REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case ADD_SIGNATURE_TO_PETITION_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        campaign: response
      };
    case ADD_SIGNATURE_TO_PETITION_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error
      };
    case OAUTH_SIGN_IN_COMPLETE:
      return log.debug('reducers connected!');
    default:
      return state;
  }
}
