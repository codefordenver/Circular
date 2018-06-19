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
  auth.onAuthStateChanged(user => {
    if (user) {
      dispatch(signedIn(user));
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      };
      usersRef.child(user.uid).set(userData);
      dispatch(fetchUserSignatures(user.uid));
    } else {
      dispatch(signedOut());
    }
  });
};
