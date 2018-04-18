// prettier-ignore
/* eslint no-console: 0*/
const mongoose = require('mongoose');
const keys = require('../backend/config/keys');

if (process.env.NODE_ENV === 'dev') {
  mongoose.connect(keys.mongoURI);
  console.log(keys.mongoURI);
}

/* eslint indent: 0  */
const seedCampaigns = require('./seedCampaigns'),
  seedUsers = require('./seedUsers'),
  seedSignatures = require('./seedSignatures'),
  seedComments = require('./seedComments'),
  seedWasteProviders = require('./seedWasteProviders');

function wipeDB() {
  seedCampaigns.removeCampaigns();
  seedUsers.removeUsers();
  seedSignatures.removeSignatures();
  seedComments.removeComments();
  seedWasteProviders.removeWasteProviders();
}

function seedDB() {
  seedCampaigns.seedCampaigns();
  seedUsers.seedUsers();
  seedSignatures.seedSignatures();
  seedComments.seedComments();
  seedWasteProviders.seedWasteProviders();
}

function wipeAndSeedDB() {
  wipeDB();
  seedDB();
}

wipeAndSeedDB();

module.exports = wipeAndSeedDB;
