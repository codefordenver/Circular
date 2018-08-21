/* eslint-disable no-console */
const { campaignsRef, Timestamp } = require('./index.js');

const signatureSeeds = [
  {
    uid: 'user123',
    displayName: 'Mr. Plastic',
    signedCampaignId: 'tJrvtzORhxYLkTbmCSsy',
    signerMessage: "Let's do this!",
    keepMeUpdated: true,
    createdAt: Timestamp,
    modifiedAt: Timestamp
  }
];

const seedSignatures = {
  seedSignatures() {
    signatureSeeds.forEach(signature => {
      campaignsRef
        .doc('tJrvtzORhxYLkTbmCSsy')
        .collection('signatures')
        .add({ ...signature })
        .then(() => {
          console.log('set signature ', signature.displayName);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
};

module.exports = seedSignatures;
