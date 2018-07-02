import { signaturesRef } from '../../firebase';

// fetch firebase users signatures request
export const firebaseFetchUserSignaturesRequest = () => ({
  type: 'FETCH_FIREBASE_USERS_REQUEST'
});

// populate firebase signatures
export const populateFirebaseUserSignatures = firebaseUserSignatures => ({
  type: 'FETCH_FIREBASE_USERS_SUCCESS',
  response: firebaseUserSignatures
});

// dispatch thunk for firebase users
export const firebaseFetchUserSignatures = () => dispatch => {
  dispatch(firebaseFetchUserSignaturesRequest());
  signaturesRef
    .get()
    .then(snapshot => {
      const firebaseUserSignatures = [];
      snapshot.forEach(doc =>
        firebaseUserSignatures.push({
          userId: doc.userId,
          campaignId: doc.data().campaignId
        })
      );
      // console.log('got to FBUser dispatch');
      dispatch(populateFirebaseUserSignatures(firebaseUserSignatures));
    })
    .catch(err => {
      // console.log('Error getting documents', err);
    });
};

// start listening for new signatures
export const startListeningForSignatures = () => dispatch => {
  signaturesRef.onSnapshot(querySnapshot => {
    const signatures = [];
    querySnapshot.forEach(doc => {
      signatures.push(doc.data().userId);
    });
    dispatch(populateFirebaseUserSignatures(signatures));
    // console.log('current signatures ', signatures);
  });
};
