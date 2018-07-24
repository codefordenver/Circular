import { auth, googleAuthProvider, facebookAuthProvider, usersRef } from '../../firebase';

// SIGN OUT
// FIREBASE SINGOUT REQUEST
export const FIREBASE_SIGN_OUT_REQUEST = 'FIREBASE_SIGN_OUT_REQUEST';
export const firebaseSignOutRequest = () => ({
  type: FIREBASE_SIGN_OUT_REQUEST
});

// FIREBASE SIGNOUT SUCCESS
export const FIREBASE_SIGN_OUT_SUCCESS = 'FIREBASE_SIGN_OUT_SUCCESS';
export const firebaseSignOutSuccess = () => ({
  type: FIREBASE_SIGN_OUT_SUCCESS
});

// FIREBASE SIGN OUT THUNK
export const firebaseSignOut = () => dispatch => {
  dispatch(firebaseSignOutRequest());
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

// FIREBASE AUTH LISTENER FUNCTION
export const FIREBASE_SIGN_IN_SUCCESS = 'FIREBASE_SIGN_IN_SUCCESS';
const firebaseSignIn = user => ({
  type: FIREBASE_SIGN_IN_SUCCESS,
  email: user.email,
  displayName: user.displayName,
  uid: user.uid
});

// FIREBASE ADD SIGNATURES TO AUTH OBJECT
// FIREBASE FETCH USER SIGNED CAMPAIGNS REQUEST
export const FIREBASE_FETCH_USER_SIGNED_CAMPAIGNS_REQUEST =
  'FIREBASE_FETCH_USER_SIGNED_CAMPAIGNS_REQUEST';
export const firebaseFetchUserSignedCampaignsRequest = () => ({
  type: FIREBASE_FETCH_USER_SIGNED_CAMPAIGNS_REQUEST
});

// FIREBASE FETCH USER SIGNED CAMPAIGNS SUCCESS
export const FIREBASE_FETCH_USER_SIGNED_CAMPAIGNS_SUCCESS =
  'FIREBASE_FETCH_USER_SIGNED_CAMPAIGNS_SUCCESS';
export const firebaseFetchUserSignedCampaignsSuccess = signedCampaignId => ({
  type: FIREBASE_FETCH_USER_SIGNED_CAMPAIGNS_SUCCESS,
  signedCampaignId
});

// FIREBASE FETCH USER SIGNED CAMPAIGNS THUNK
export const firebaseFetchUserSignedCampaigns = uid => async dispatch => {
  dispatch(firebaseFetchUserSignedCampaignsRequest());
  // SEARCHED FOR MATCHING DATABASE USER DOC AND RETURNS THEIR SIGNED CAMPAIGN INFORMATION
  usersRef
    .doc(uid)
    .get()
    .then(user => {
      const signedCampaignId = user.data().signedCampaignId;
      // DISPATCHED TO ADD SIGNEDCAMPAIGNID TO USER AUTH OBJECT
      dispatch(firebaseFetchUserSignedCampaignsSuccess(signedCampaignId));
    })
    .catch(error => {
      // TODO IMPROVE ERROR HANDELING
      console.log('error fetching user signed campaign', error);
    });
};

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
      // ADDS OR MERGES AUTH INFORMATION TO USERS COLLECTION
      usersRef.doc(uid).set(userData, { merge: true });
      // DISPATCHES FETCH USER SIGNED CAMPAIGN
      dispatch(firebaseFetchUserSignedCampaigns(userData.uid));
    } else {
      // if there is no user, signOut() resets to initial state
      dispatch(firebaseSignOut());
    }
  });
};
