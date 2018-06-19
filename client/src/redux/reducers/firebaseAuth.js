import initialState from '../initial-state.js';

export default function authReducer(state = initialState.auth, action) {
  const { email, displayName, uid, type } = action;
  switch (type) {
    case 'ATTEMPTING_LOGIN_FACEBOOK':
      return {
        status: 'AWAITING_FACEBOOK_AUTH_RESPONSE'
      };
    case 'ATTEMPTING_LOGIN_GOOGLE':
      return {
        status: 'AWAITING_GOOGLE_AUTH_RESPONSE'
      };
    case 'ATTEMPTING_SIGN_OUT':
      return {
        status: 'ATTEMPTING_SIGN_OUT'
      };
    case 'SIGN_OUT':
      return {
        status: 'ANONYMOUS',
        email: null,
        displayName: null,
        uid: null
      };
    case 'SIGN_IN':
      return {
        status: 'SIGNED_IN',
        email,
        displayName,
        uid
      };
    default:
      return state;
  }
}
