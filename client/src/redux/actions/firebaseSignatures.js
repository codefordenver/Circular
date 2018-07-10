import { signaturesRef } from '../../firebase';

// fetch firebase users signatures request
export const firebaseFetchUserSignaturesRequest = () => ({
  type: 'FETCH_FIREBASE_SIGNATURES_REQUEST'
});

// populate firebase signatures
export const populateFirebaseUserSignatures = firebaseUserSignatures => ({
  type: 'FETCH_FIREBASE_SIGNATURES_SUCCESS',
  response: firebaseUserSignatures
});

// dispatch thunk for firebase users
export const firebaseFetchUserSignatures = firebaseUserSignatures => dispatch => {
  dispatch(firebaseFetchUserSignaturesRequest());
  dispatch(populateFirebaseUserSignatures(firebaseUserSignatures));
};

// start listening for new signatures
export const startListeningForSignatures = () => dispatch => {
  signaturesRef.onSnapshot(querySnapshot => {
    const signatures = [];
    querySnapshot.forEach(doc => {
      signatures.push({ userId: doc.data().userId, campaignId: doc.data().campaignId });
    });
    dispatch(firebaseFetchUserSignatures(signatures));
  });
};
