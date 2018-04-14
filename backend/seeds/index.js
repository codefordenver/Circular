//import seed functions
// prettier-ignore
/*eslint indent: 0*/
const seedCampaigns = require('./seedCampaigns'),
      seedUsers     = require('./seedUsers'),
      seedSignatures = require('./seedSignatures');

function seedDB() {
  seedCampaigns.removeCampaigns();
  seedUsers.removeUsers();
  seedSignatures.removeSignatures();
  seedCampaigns.seedCampaigns();
  seedUsers.seedUsers();
  seedSignatures.seedSignatures();
}

// seedDB();
