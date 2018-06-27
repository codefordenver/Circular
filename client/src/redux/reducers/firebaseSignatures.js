const inititalState = {
  loading: false,
  loaded: false
};

export default function firebaseSignaturesReducer(state = inititalState, action) {
  const { response, type } = action;
  switch (type) {
    case 'FETCH_FIREBASE_USERS_REQUEST':
      return {
        loading: true,
        loaded: false
      };
    case 'FETCH_FIREBASE_USERS_SUCCESS':
      return {
        loading: false,
        loaded: true,
        firebaseUserSignatures: response
      };

    default:
      return state;
  }
}
