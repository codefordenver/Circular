import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyDCfhYmCmE0YQbJA-RGq6C0UpiGSSIM3S8',
  authDomain: 're-imagine-prod.firebaseapp.com',
  databaseURL: 'https://re-imagine-prod.firebaseio.com',
  projectId: 're-imagine-prod',
  storageBucket: 're-imagine-prod.appspot.com',
  messagingSenderId: '164611064308'
};

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
export const usersRef = database.ref('users/');
