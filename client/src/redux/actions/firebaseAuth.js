import { auth, googleAuthProvider, facebookAuthProvider, usersRef } from '../../firebase';
import { firebaseFetchUserSignatures } from './firebaseSignatures';

// SIGN OUT
// FIREBASE SIGNOUT SUCCESS
export const FIREBASE_SIGN_OUT_SUCCESS = 'FIREBASE_SIGN_OUT_SUCCESS';
export const firebaseSignOutSuccess = () => ({
  type: FIREBASE_SIGN_OUT_SUCCESS
});

// FIREBASE SIGN OUT THUNK
export const firebaseSignOut = () => dispatch => {
  // dispatch(firebaseSignOutRequest());
  // TODO EXPLORE ERROR HANDELING
  auth.signOut();
  dispatch(firebaseSignOutSuccess());
};

// SIGNIN REQUESTS
// FIREBASE SIGN IN GOOGLE REQUEST
export const FIREBASE_SIGN_IN_GOOGLE_REQUEST = 'FIREBASE_SIGN_IN_GOOGLE_REQUEST';
export const firebaseSignInGoogleRequest = () => ({
  type: FIREBASE_SIGN_IN_GOOGLE_REQUEST
});

// TODO HANDLE FACEBOOK AUTH THINGS
// FIREBASE SIGN IN FACEBOOK REQUEST
export const FIREBASE_SIGN_IN_FACEBOOK_REQUEST = 'FIREBASE_SIGN_IN_FACEBOOK_REQUEST';
export const firebaseSignInFacebookRequest = () => ({
  type: FIREBASE_SIGN_IN_FACEBOOK_REQUEST
});

// SIGNIN SUCCESS
// FIREBASE SIGN IN GOOGLE SUCCESS
export const FIREBASE_SIGN_IN_GOOGLE_SUCCESS = 'FIREBASE_SIGN_IN_GOOGLE_SUCCESS';
export const firebaseSignInGoogleSuccess = () => ({
  type: FIREBASE_SIGN_IN_GOOGLE_SUCCESS
});

// FIREBASE SIGN IN THUNKS
// GOOGLE SIGN IN THUNK
export const firebaseSignInGoogle = () => dispatch => {
  dispatch(firebaseSignInGoogleRequest());
  auth.signInWithPopup(googleAuthProvider);
};

// FACEBOOK SIGN IN THUNK
export const firebaseSignInFacebook = () => dispatch => {
  dispatch(firebaseSignInFacebookRequest());
  firebaseSignOut();
};

// FIREBASE SIGN IN FACEBOOK SUCCESS

// FIREBASE SIGN IN THUNK

// const signedOut = () => ({
//   type: 'SIGN_OUT'
// });

// export const FIREBASE_SIGN_OUT_REQUEST = 'FIREBASE_SIGN_OUT_REQUEST';
// export const firebaseSignOutRequest = () => ({
//   type: 'FIREBASE_SIGN_OUT_REQUEST'
// });

export const signInGoogle = () => dispatch => {
  dispatch({ type: 'ATTEMPTING_LOGIN_GOOGLE' });
  auth.signInWithPopup(googleAuthProvider);
};

export const signInFacebook = () => dispatch => {
  dispatch({ type: 'ATTEMPTING_LOGIN_FACEBOOK' });
  auth.signInWithPopup(facebookAuthProvider);
};

export const signOut = () => dispatch => {
  dispatch({ type: 'ATTEMPTING_SIGN_OUT' });
  auth.signOut();
};

// FIREBASE AUTH LISTENER FUNCTIONS
export const FIREBASE_SIGN_IN_SUCCESS = 'FIREBASE_SIGN_IN_SUCCESS';
const firebaseSignIn = user => ({
  type: FIREBASE_SIGN_IN_SUCCESS,
  email: user.email,
  displayName: user.displayName,
  uid: user.uid
});

// FIREBASE AUTH LISTENERS
// WHEN AUTH CHANGES, DISPATCH `firebaseSignIn()`. THEN FETCH USER SIGNATUERS
export const startListeningToAuthChanges = () => dispatch => {
  // Listens for authStateChange from firebase
  auth.onAuthStateChanged(user => {
    // If user, then set user
    if (user) {
      const { uid, email, displayName } = user;
      dispatch(firebaseSignIn(user));
      const userData = {
        uid,
        email,
        displayName
      };
      usersRef.doc(uid).set(userData);
      // firebase.firestore().collection('users').doc(currentUser.uid).set(currentUser)
      // will needs to pass user.uid to fetchUserSignatures once signatures are stored in Firebase
      // sample
      // dispatch(fetchUserSignatures('5ad27d0d829e17f7343211f8'));
      dispatch(firebaseFetchUserSignatures());
    } else {
      // if there is no user, signOut() resets to initial state
      dispatch(firebaseSignOut());
    }
  });
};
