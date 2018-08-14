import {
  FETCH_WASTE_PROVIDERS_REQUEST,
  FETCH_WASTE_PROVIDERS_SUCCESS,
  FETCH_WASTE_PROVIDERS_ERROR
} from '../actions/firebaseWasteProviders';

const DEFAUT_STATE = {
  loading: false,
  loaded: false
};

export default function (state = DEFAUT_STATE, action) {
  const { response, error, type } = action;
  switch (type) {
    case FETCH_WASTE_PROVIDERS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_WASTE_PROVIDERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        wasteProviders: response
      };
    }
    case FETCH_WASTE_PROVIDERS_ERROR: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error
      };
    }
    default:
      return state;
  }
}
