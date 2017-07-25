import { APARTMENTS_REQUEST, APARTMENTS_SUCCESS, APARTMENTS_FAILURE } from '../constants/apartments';

const defaultState = {
  loading: false,
  loaded: false
};

export default function (state = defaultState, action) {
  const { response, error, type } = action;
  switch (type) {
    case APARTMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case APARTMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        apartments: response
      };
    case APARTMENTS_FAILURE:
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
