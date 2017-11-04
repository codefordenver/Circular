import createApiRequest from '../../utils/createApiRequest';

export default function fetchUser() {
  return {
    type: 'FETCH_USER',
    promise: createApiRequest('api/current_user', 'GET')
  };
}
