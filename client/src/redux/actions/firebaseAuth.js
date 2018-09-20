import { auth, googleAuthProvider, facebookAuthProvider, usersRef } from '../../firebase';

// SIGN OUT
// FIREBASE SIGN OUT REQUEST
export const FIREBASE_SIGN_OUT_REQUEST = 'FIREBASE_SIGN_OUT_REQUEST';
export const firebaseSignOutRequest = () => ({
  type: FIREBASE_SIGN_OUT_REQUEST
});

// FIREBASE SIGN OUT SUCCESS
export const FIREBASE_SIGN_OUT_SUCCESS = 'FIREBASE_SIGN_OUT_SUCCESS';
export const firebaseSignOut = () => ({
  type: FIREBASE_SIGN_OUT_SUCCESS
});

// SIGNIN REQUESTS
// GOOGLE
// FIREBASE SIGN IN GOOGLE REQUEST
export const FIREBASE_SIGN_IN_GOOGLE_REQUEST = 'FIREBASE_SIGN_IN_GOOGLE_REQUEST';
export const firebaseSignInGoogleRequest = () => ({
  type: FIREBASE_SIGN_IN_GOOGLE_REQUEST
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

// FIREBASE SIGN IN FACEBOOK REQUEST
export const FIREBASE_SIGN_IN_FACEBOOK_REQUEST = 'FIREBASE_SIGN_IN_FACEBOOK_REQUEST';
export const firebaseSignInFacebookRequest = () => ({
  type: FIREBASE_SIGN_IN_FACEBOOK_REQUEST
});

// FIREBASE SIGN IN FACEBOOK SUCCESS
export const FIREBASE_SIGN_IN_FACEBOOK_SUCCESS = 'FIREBASE_SIGN_IN_FACEBOOK_SUCCESS';
export const firebaseSignInFacebookSuccess = () => ({
  type: FIREBASE_SIGN_IN_FACEBOOK_SUCCESS
});

// FACEBOOK SIGN IN THUNK
export const firebaseSignInFacebook = () => dispatch => {
  dispatch(firebaseSignInFacebookRequest());
  auth.signInWithPopup(facebookAuthProvider);
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
      // TODO RESOLVE THIS ESLINT ERROR FOR NO UNSED VARS
      // eslint-disable-next-line no-unused-vars
      const signedCampaignId = user.data().signedCampaignId ? user.data().signedCampaignId : null;
      // DISPATCHED TO ADD SIGNEDCAMPAIGNID TO USER AUTH OBJECT
      // If SIGNEDCAMPAIGNID === undefined, PASS NULL IN ARGUMENT
      dispatch(firebaseFetchUserSignedCampaignsSuccess(signedCampaignId));
    })
    .catch(error => {
      // TODO IMPROVE ERROR HANDELING
      /* eslint-disable no-console */
      console.log('error fetching user signed campaign', error);
    });
};

// FIREBASE AUTH LISTENERS
// WHEN AUTH CHANGES, DISPATCH `firebaseSignIn()`. THEN FETCH USER SIGNATUERS
export const startListeningToAuthChanges = () => dispatch => {
  // LISTENS FOR AUTH CHANGES
  auth.onAuthStateChanged(user => {
    // IF USER, SET USER
    if (user) {
      // DECONSTRUCT FIREBASE USER OBJECT
      const { uid } = user;
      const { email, displayName, providerId, photoURL } = user.providerData[0];
      // DISPATCH LOGGED IN USER
      dispatch(firebaseSignIn(user));
      // BUILD OBJECT AND PASS TO FIRESTORE
      const userData = {
        uid,
        email,
        displayName,
        providerId,
        photoURL,
        createdCampaignId: null,
        signedCampaignId: null
      };
      // ADDS OR MERGES AUTH INFORMATION TO USERS COLLECTION
      usersRef.doc(uid).set(userData, { merge: true });
      // DISPATCHES FETCH USER SIGNED CAMPAIGN
      dispatch(firebaseFetchUserSignedCampaigns(uid));
    } else {
      // if there is no user, signOut() resets to initial state
      dispatch(firebaseSignOut());
    }
  });
};

// UPDATE USER CREATED CAMPAIGN ID THUNK
export const firebaseUpdateUserCreatedCampaignId = (user, createdCampaignId) => {
  console.log(user);

  const userRef = usersRef.doc(user.uid);

  userRef
    .update({
      createdCampaignId
    })
    .then(() => {
      console.log('User createdCampaignId successfully updated!');
    })
    .catch(error => {
      // The document probably doesn't exist.
      console.error('Error updating user createdCampaignId: ', error);
    });
};
