/* eslint-disable no-console */
const { usersRef } = require('./index.js');

const userSeeds = [
  {
    uid: 'user123',
    email: 'email@123.com',
    displayName: 'Mr. Plastic',
    providerId: 'google.com',
    signedCampaignId: 'tJrvtzORhxYLkTbmCSsy'
  },
  {
    uid: 'user456',
    email: 'email@456.com',
    displayName: 'Miss. Recycle',
    providerId: 'facebook.com',
    signedCampaignId: ''
  },
  {
    uid: 'user789',
    email: 'email@789.com',
    displayName: "I haven't signed a campaign",
    providerId: 'google.com',
    signedCampaignId: ''
  }
];

const seedUsers = {
  seedUsers() {
    userSeeds.forEach(user => {
      usersRef
        .doc(user.uid)
        .set({ ...user })
        .then(() => {
          console.log('set user', user.uid);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
};

module.exports = seedUsers;
