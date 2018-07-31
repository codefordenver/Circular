import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
// import { development } from "./firebaseKeys";
// import { staging } from './firebaseKeys';
import { production } from "./firebaseKeys";

// FIREBASE DEV
firebase.initializeApp({
  ...production
});

export const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

export default firebase;
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
export const usersRef = firestore.collection("users");
export const wasteProvidersRef = firestore.collection("wasteProviders");
export const campaignsRef = firestore.collection("campaigns");
// must export firestore without () to access GeoPoint constructor
export const GeoPoint = firebase.firestore.GeoPoint;
export const Timestamp = firebase.firestore.FieldValue.serverTimestamp();
