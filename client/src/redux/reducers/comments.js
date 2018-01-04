import {
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE
} from '../constants/comments';

const defaultState = {
  loading: false,
  loaded: false
};

export default function (state = defaultState, action) {
  const { response, error, type } = action;
  switch (type) {
    case FETCH_COMMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        campaignComments: response.data
      };
    case FETCH_COMMENTS_FAILURE:
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
