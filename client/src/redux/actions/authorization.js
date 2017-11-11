import createApiRequest from '../../utils/createApiRequest';

export function fetchUser() {
  return {
    type: 'FETCH_USER',
    promise: createApiRequest('api/current_user', 'GET')
  };
}

// export function beginAuth(router) {
//   return {
//     type: 'REQUEST_GOOGLE_AUTH',
//     promise: router.push('auth/google')
//   };
// }
