import { auth, googleAuthProvider, facebookAuthProvider, usersRef } from '../../firebase';

// SIGN OUT
// FIREBASE SIGN OUT REQUEST
export const FIREBASE_SIGN_OUT_REQUEST = 'FIREBASE_SIGN_OUT_REQUEST';
const firebaseSignOutRequest = () => ({
  type: FIREBASE_SIGN_OUT_REQUEST
});

// FIREBASE SIGN OUT SUCCESS
export const FIREBASE_SIGN_OUT_SUCCESS = 'FIREBASE_SIGN_OUT_SUCCESS';
const firebaseSignOutSuccess = () => ({
  type: FIREBASE_SIGN_OUT_SUCCESS
});

export const firebaseSignOut = () => dispatch => {
  dispatch(firebaseSignOutRequest());
  try {
    auth.signOut().then(() => {
      dispatch(firebaseSignOutSuccess());
    });
  } catch (error) {
    // TODO improve error handeling
    // eslint-disable-next-line
    console.log('there was an error signing out');
  }
};

// SIGNIN REQUESTS
// GOOGLE
// FIREBASE SIGN IN GOOGLE REQUEST
export const FIREBASE_SIGN_IN_GOOGLE_REQUEST = 'FIREBASE_SIGN_IN_GOOGLE_REQUEST';
const firebaseSignInGoogleRequest = () => ({
  type: FIREBASE_SIGN_IN_GOOGLE_REQUEST
});

// FIREBASE SIGN IN
// GOOGLE SIGN IN
export const firebaseSignInGoogle = () => dispatch => {
  dispatch(firebaseSignInGoogleRequest());
  auth.signInWithPopup(googleAuthProvider);
};

// FIREBASE SIGN IN FACEBOOK REQUEST
export const FIREBASE_SIGN_IN_FACEBOOK_REQUEST = 'FIREBASE_SIGN_IN_FACEBOOK_REQUEST';
const firebaseSignInFacebookRequest = () => ({
  type: FIREBASE_SIGN_IN_FACEBOOK_REQUEST
});

// FIREBASE SIGN IN FACEBOOK SUCCESS
export const FIREBASE_SIGN_IN_FACEBOOK_SUCCESS = 'FIREBASE_SIGN_IN_FACEBOOK_SUCCESS';
const firebaseSignInFacebookSuccess = () => ({
  type: FIREBASE_SIGN_IN_FACEBOOK_SUCCESS
});

// FIREBASE SIGN IN FACEBOOK SUCCESS
export const FIREBASE_SIGN_IN_FACEBOOK_ERROR = 'FIREBASE_SIGN_IN_FACEBOOK_ERROR';
const firebaseSignInFacebookError = error => ({
  type: FIREBASE_SIGN_IN_FACEBOOK_ERROR,
  error
});

// FACEBOOK SIGN IN
export const firebaseSignInFacebook = () => dispatch => {
  dispatch(firebaseSignInFacebookRequest());
  auth
    .signInWithPopup(facebookAuthProvider)
    .then(() => {
      dispatch(firebaseSignInFacebookSuccess());
    })
    .catch(error => {
      dispatch(firebaseSignInFacebookError(error));
    });
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

// FIREBASE ADD SIGNATURES TO AUTH OBJECT
// FIREBASE FETCH USER DATA REQUEST
export const FIREBASE_FETCH_USER_DATA_REQUEST = 'FIREBASE_FETCH_USER_DATA_REQUEST';
const firebaseFetchUserDataRequest = () => ({
  type: FIREBASE_FETCH_USER_DATA_REQUEST
});

// FIREBASE FETCH USER DATA SUCCESS
export const FIREBASE_FETCH_USER_DATA_SUCCESS = 'FIREBASE_FETCH_USER_DATA_SUCCESS';
const firebaseFetchUserDataSuccess = userInfo => ({
  type: FIREBASE_FETCH_USER_DATA_SUCCESS,
  response: { ...userInfo }
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
    .then(user => {
      const { createdCampaignId, signedCampaignId } = user.data();
      const userInfo = { createdCampaignId, signedCampaignId };
      // TODO RESOLVE THIS ESLINT ERROR FOR NO UNSED VARS
      // eslint-disable-next-line no-unused-vars
      // DISPATCHED TO ADD SIGNEDCAMPAIGNID TO USER AUTH OBJECT
      // If SIGNEDCAMPAIGNID === undefined, PASS NULL IN ARGUMENT
      dispatch(firebaseFetchUserDataSuccess(userInfo));
    })
    .catch(error => {
      // TODO IMPROVE ERROR HANDELING
      /* eslint-disable no-console */
      console.log('error fetching user signed campaign', error);
      dispatch(firebaseFetchUserDataError(error));
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

// UPDATE USER CREATED CAMPAIGN ID
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
      dispatch(firebaseFetchUserData(uid));
    })
    .catch(error => {
      // The document probably doesn't exist.
      console.error('Error updating user createdCampaignId: ', error);
      dispatch(updateUserCreatedCampaignIdError(error));
    });
};
