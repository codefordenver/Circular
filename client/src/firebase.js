import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

// FIREBASE KEYS IMPORT BASED ON ENV
firebase.initializeApp({
  apiKey: 'AIzaSyD3Ot2BrEc595ost38YzkKEKS66xwn3MkE',
  authDomain: 're-imagine-dev.firebaseapp.com',
  databaseURL: 'https://re-imagine-dev.firebaseio.com',
  projectId: 're-imagine-dev',
  storageBucket: 're-imagine-dev.appspot.com',
  messagingSenderId: '86888468802'
  // apiKey: `${process.env.REACT_APP_apiKey}`,
  // authDomain: `${process.env.REACT_APP_authDomain}`,
  // databaseURL: `${process.env.REACT_APP_databaseURL}`,
  // projectId: `${process.env.REACT_APP_projectId}`,
  // storageBucket: `${process.env.REACT_APP_storageBucket}`,
  // messagingSenderId: `${process.env.REACT_APP_messagingSenderId}`
});

export const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

export default firebase;
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
export const usersRef = firestore.collection('users');
export const wasteProvidersRef = firestore.collection('wasteProviders');
export const campaignsRef = firestore.collection('campaigns');
// must export firestore without () to access GeoPoint constructor
export const GeoPoint = firebase.firestore.GeoPoint;
export const Timestamp = firebase.firestore.FieldValue.serverTimestamp();
