import { auth, googleAuthProvider, facebookAuthProvider, usersRef } from '../../firebase';
import { fetchUserSignatures } from './signature';

const signedIn = user => ({
  type: 'SIGN_IN',
  email: user.email,
  displayName: user.displayName,
  uid: user.uid
});

const signedOut = () => ({
  type: 'SIGN_OUT'
});

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

// when auth changes dispatch signedIn, then fetchUserSignatures
export const startListeningToAuthChanges = () => dispatch => {
  // Listens for authStateChange from firebase
  auth.onAuthStateChanged(user => {
    const { uid, email, displayName } = user;
    // If user, then set user
    if (user) {
      dispatch(signedIn(user));
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
      dispatch(fetchUserSignatures(uid));
    } else {
      // if there is no user, signOut() resets to initial state
      dispatch(signedOut());
    }
  });
};
