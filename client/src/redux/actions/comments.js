import createApiRequest from '../../utils/createApiRequest';

export default function fetchComments(id) {
  return {
    type: 'FETCH_COMMENTS',
    promise: createApiRequest(`api/comments/${id}`, 'GET')
  };
}
