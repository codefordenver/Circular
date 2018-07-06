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
    console.log('signatures ', signatures);
    dispatch(firebaseFetchUserSignatures(signatures));
  });
};

// export const startListeningForSignatures = () => dispatch => {
//   signaturesRef.onSnapshot(snapshot => {
//     snapshot.docChanges().forEach(change => {
//       if (change.type === 'added') {
//         const firebaseUserSignatures = change.doc.data();
//         console.log('dispatching this bitch', firebaseUserSignatures);
//         dispatch(populateFirebaseUserSignatures(firebaseUserSignatures));
//         // do this thing change.doc.data()
//       }
//       // if (change.type === 'modified') {
//       //   console.log('changed ', change.doc.data());
//       // }
//       // if (change.type === 'removed') {
//       //   // do this thing change.doc.data()]}
//       // }
//     });
//   });
// };
