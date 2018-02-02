import {
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAILURE
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
        commentsLoading: true,
        commentsLoaded: false
      };
    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        commentsLoading: false,
        commentsLoaded: true,
        campaignComments: response.data
      };
    case FETCH_COMMENTS_FAILURE:
      return {
        ...state,
        commentsLoading: false,
        commentsLoaded: false,
        fetchError: error
      };
    case POST_COMMENT_REQUEST:
      return {
        ...state
      };
    case POST_COMMENT_SUCCESS:
      return {
        ...state
      };
    case POST_COMMENT_FAILURE:
      return {
        ...state,
        postError: error
      };
    default:
      return state;
  }
}
