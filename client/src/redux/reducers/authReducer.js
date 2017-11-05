import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from '../constants/auth';

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
    default:
      return state;
  }
}
