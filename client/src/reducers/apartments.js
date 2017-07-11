import { APARTMENTS_REQUEST, APARTMENTS_SUCCESS, APARTMENTS_FAILURE } from '../constants/apartments';

const defaultState = {
  loading: false,
  loaded: false,
  data: []
};

export default function(state = defaultState, action) {
  const { apartments } = action;
  switch (action.type) {
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
        apartments
      };
    case APARTMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false
      };
    default:
      return state;
  }
}
