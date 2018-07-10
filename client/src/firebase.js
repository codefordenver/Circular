import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyDCfhYmCmE0YQbJA-RGq6C0UpiGSSIM3S8',
  authDomain: 're-imagine-prod.firebaseapp.com',
  databaseURL: 'https://re-imagine-prod.firebaseio.com',
  projectId: 're-imagine-prod',
  storageBucket: 're-imagine-prod.appspot.com',
  messagingSenderId: '164611064308'
};

firebase.initializeApp(config);
export const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

export default firebase;
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
export const usersRef = firestore.collection('users');
export const wasteProvidersRef = firestore.collection('wasteProviders');
export const signaturesRef = firestore.collection('signatures');
export const campaignsRef = firestore.collection('campaigns');
// must export firestore without () to access GeoPoint constructor
export const GeoPoint = firebase.firestore.GeoPoint;
export const Timestamp = firebase.firestore.FieldValue.serverTimestamp();
