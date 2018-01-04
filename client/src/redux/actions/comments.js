import createApiRequest from '../../utils/createApiRequest';

export function fetchComments(id) {
  return {
    type: 'FETCH_COMMENTS',
    promise: createApiRequest(`api/comments/${id}`, 'GET')
  };
}

export function postComment(data) {
  return {
    type: 'POST_COMMENT',
    promise: createApiRequest('api/comments', 'POST', data)
  };
}
