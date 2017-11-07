import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE, LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS } from '../constants/auth';

export default function (state = {}, action) {
  const { response, error, type } = action;
  switch (type) {
    case FETCH_USER_REQUEST:
      return {
        ...state
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        ...response.data
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        error
      };
    case LOG_OUT_REQUEST:
      return {
        ...state
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        ...response.data
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
        error
      };
    default:
      return state;
  }
}
