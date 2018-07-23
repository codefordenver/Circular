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
export const firebaseSignInGoogle = () => async dispatch => {
  dispatch(firebaseSignInGoogleRequest());
  const userId = await auth.signInWithPopup(googleAuthProvider).then(result => result.user.uid);
  console.log('userId ', userId);
  usersRef
    .doc(userId)
    .get()
    .then(doc => {
      console.log(...doc.data());
      dispatch(firebaseSignIn(...doc.data()));
    });
  // usersRef
  //   .doc(userAuthData.uid)
  //   .get()
  //   .then(userData => {
  //     console.log(...userData);
  //   })
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
const firebaseSignIn = async user => ({
  type: FIREBASE_SIGN_IN_SUCCESS,
  email: user.email,
  displayName: user.displayName,
  uid: user.uid,
  signedCampaignId: user.signedCampaignId
});

// FIREBASE AUTH LISTENERS
// WHEN AUTH CHANGES, DISPATCH `firebaseSignIn()`. THEN FETCH USER SIGNATUERS
export const startListeningToAuthChanges = () => async dispatch => {
  // LISTEN FOR AUTH STATE CHANGE FROM FIREBASE
  await auth.onAuthStateChanged(user => {
    // IF THERE IS NO USER, SIGNOUT() RESETS TO INITIAL STATE
    if (!user) {
      dispatch(firebaseSignOut());
    }
    // IF USER
    const { uid, email, displayName } = user;
    const updateUserData = {
      uid,
      email,
      displayName
    };
    // ADD USER DATA TO FIRESTORE
    usersRef.doc(uid).set(updateUserData, { merge: true });
    // DISPATCH AUTH USER
    dispatch(firebaseSignInGoogle(user));
  });
};
