import {
  FETCH_WASTE_PROVIDERS_REQUEST,
  FETCH_WASTE_PROVIDERS_SUCCESS,
  FETCH_WASTE_PROVIDERS_FAILURE,
  FETCH_WASTE_PROVIDER_REQUEST,
  FETCH_WASTE_PROVIDER_SUCCESS,
  FETCH_WASTE_PROVIDER_FAILURE
} from '../constants/wasteProvider';

const defaultState = {
  loading: false,
  loaded: false
};

export default function (state = defaultState, action) {
  const { response, error, type } = action;
  switch (type) {
    case FETCH_WASTE_PROVIDERS_REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case FETCH_WASTE_PROVIDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        wasteProviders: response.data
      };
    case FETCH_WASTE_PROVIDERS_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error
      };
    case FETCH_WASTE_PROVIDER_REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case FETCH_WASTE_PROVIDER_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        activeProvider: response.data[0]
      };
    case FETCH_WASTE_PROVIDER_FAILURE:
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
