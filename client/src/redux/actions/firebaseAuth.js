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
const firebaseSignIn = user => {
  const { email, displayName, uid } = user;
  return {
    type: FIREBASE_SIGN_IN_SUCCESS,
    email,
    displayName,
    uid
  };
};

// FIREBASE ADD SIGNATURES TO AUTH OBJECT
// FIREBASE FETCH USER DATA REQUEST
export const FIREBASE_FETCH_USER_DATA_REQUEST = 'FIREBASE_FETCH_USER_DATA_REQUEST';
const firebaseFetchUserDataRequest = () => ({
  type: FIREBASE_FETCH_USER_DATA_REQUEST
});

// FIREBASE FETCH USER DATA SUCCESS
export const FIREBASE_FETCH_USER_DATA_SUCCESS = 'FIREBASE_FETCH_USER_DATA_SUCCESS';
const firebaseFetchUserDataSuccess = (createdCampaignId, signedCampaignId) => ({
  type: FIREBASE_FETCH_USER_DATA_SUCCESS
});

// FIREBASE FETCH USER DATA ERROR
export const FIREBASE_FETCH_USER_DATA_ERROR = 'FIREBASE_FETCH_USER_DATA_ERROR';
const firebaseFetchUserDataError = error => ({
  type: FIREBASE_FETCH_USER_DATA_ERROR,
  error
});

// FIREBASE FETCH USER DATA THUNK
export const firebaseFetchUserData = uid => async dispatch => {
  dispatch(firebaseFetchUserDataRequest());
  // SEARCHED FOR MATCHING DATABASE USER DOC AND RETURNS THEIR SIGNED CAMPAIGN INFORMATION
  usersRef
    .doc(uid)
    .get()
    .then(() => {
      // TODO RESOLVE THIS ESLINT ERROR FOR NO UNSED VARS
      // eslint-disable-next-line no-unused-vars
      // DISPATCHED TO ADD SIGNEDCAMPAIGNID TO USER AUTH OBJECT
      // If SIGNEDCAMPAIGNID === undefined, PASS NULL IN ARGUMENT
      dispatchEvent(firebaseFetchUserDataSuccess());
    })
    .catch(error => {
      // TODO IMPROVE ERROR HANDELING
      /* eslint-disable no-console */
      console.log('error fetching user signed campaign', error);
      dispatch(firebaseFetchUserDataError(error));
    });
};

// FIREBASE AUTH LISTENERS
// WHEN AUTH CHANGES, DISPATCH `firebaseSignIn()`. THEN FETCH USER SIGNATUERS
export const startListeningToAuthChanges = () => dispatch => {
  // LISTENS FOR AUTH CHANGES
  auth.onAuthStateChanged(user => {
    console.log(user);
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
        photoURL
      };
      // ADDS OR MERGES AUTH INFORMATION TO USERS COLLECTION
      usersRef.doc(uid).set(userData, { merge: true });
      // DISPATCHES FETCH USER DATA
      dispatch(firebaseFetchUserData(uid));
    } else {
      // if there is no user, signOut() resets to initial state
      dispatch(firebaseSignOut());
    }
  });
};

// UPDATE USER CREATED CAMAPAIGN ID REQUEST
export const UPDATE_USER_CREATED_CAMPAIGN_ID_REQUEST = 'UPDATE_USER_CREATED_CAMPAIGN_ID_REQUEST';
const updateUserCreatedCampaignIdRequest = () => ({
  type: UPDATE_USER_CREATED_CAMPAIGN_ID_REQUEST
});

// UPDATE USER CREATED CAMAPAIGN ID SUCCESS
export const UPDATE_USER_CREATED_CAMPAIGN_ID_SUCCESS = 'UPDATE_USER_CREATED_CAMPAIGN_ID_SUCCESS';
const updateUserCreatedCampaignIdSuccess = user => ({
  type: UPDATE_USER_CREATED_CAMPAIGN_ID_SUCCESS,
  response: user
});

// UPDATE USER CREATED CAMAPAIGN ID ERROR
export const UPDATE_USER_CREATED_CAMPAIGN_ID_ERROR = 'UPDATE_USER_CREATED_CAMPAIGN_ID_ERROR';
const updateUserCreatedCampaignIdError = error => ({
  type: UPDATE_USER_CREATED_CAMPAIGN_ID_ERROR,
  error
});

// UPDATE USER CREATED CAMPAIGN ID THUNK
export const firebaseUpdateUserCreatedCampaignId = (uid, createdCampaignId) => dispatch => {
  dispatch(updateUserCreatedCampaignIdRequest);

  const userRef = usersRef.doc(uid);

  userRef
    .update({
      createdCampaignId
    })
    .then(() => {
      console.log('User createdCampaignId successfully updated!');
      dispatch(updateUserCreatedCampaignIdSuccess());
      dispatch(firebaseFetchUserData());
    })
    .catch(error => {
      // The document probably doesn't exist.
      console.error('Error updating user createdCampaignId: ', error);
      dispatch(updateUserCreatedCampaignIdError(error));
    });
};
