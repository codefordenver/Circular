/* eslint-disable no-console */
const firebase = require('firebase/app');
require('firebase/database');
require('firebase/firestore');
const firebaseKeys = require('./firebaseKeys');

if (process.env.NODE_ENV === 'staging') {
  firebase.initializeApp(firebaseKeys.staging);
  console.log('#########  USING STAGING ENV  #########');
}

const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

const campaignsRef = firestore.collection('campaigns');
const usersRef = firestore.collection('users');
const wasteProvidersRef = firestore.collection('wasteProviders');
// must export firestore without () to access GeoPoint constructor
const GeoPoint = firebase.firestore.GeoPoint;
const Timestamp = firebase.firestore.FieldValue.serverTimestamp();

module.exports = {
  campaignsRef,
  firestore,
  GeoPoint,
  Timestamp,
  usersRef,
  wasteProvidersRef
};
const seedCampaigns = require('./seedCampaigns');
const seedWasteProviders = require('./seedWasteProviders');
const seedUsers = require('./seedUsers');
const seedSigatures = require('./seedSignatures');

const seedDB = async () => {
  try {
    console.log('Setting Campaigns');
    await seedCampaigns.seedCampaigns();
    await seedWasteProviders.seedWasteProviders();
    await seedUsers.seedUsers();
    await seedSigatures.seedSignatures();
    process.on('exit', code => console.log(`About to exit with code ${code}`));
    // process.exit();
  } catch (err) {
    console.log(err);
  }
};

module.exports = seedDB();
