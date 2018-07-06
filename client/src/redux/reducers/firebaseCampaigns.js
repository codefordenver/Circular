const inititalState = {
  loading: false,
  loaded: false
};

export default function firebaseSignaturesReducer(state = inititalState, action) {
  const { response, type } = action;
  switch (type) {
    case 'FETCH_FIREBASE_CAMPAIGNS_REQUEST':
      return {
        loading: true,
        loaded: false
      };
    case 'FETCH_FIREBASE_CAMPAIGNS_SUCCESS':
      return {
        loading: false,
        loaded: true,
        firebaseCampaigns: response
      };
    default:
      return state;
  }
}
