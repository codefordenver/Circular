const Campaign = require('../models/Campaign');

const seedCampaigns = {
  removeCampaigns: function() {
    Campaign.remove({}, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log(
          '\n\n##################\n\n All Seed Campaigns Removed\n\n##################\n\n'
        );
      }
    });
  },
  seedCampaigns: function() {
    console.log(
      '\n\n##################\n\n Seeding Campaigns \n\n##################\n\n'
    );
    seedCampaignsArray.forEach(seedCampaign => {
      Campaign.create(seedCampaign, (err, seedCampaign) => {
        if (err) {
          console.log(err);
        } else {
          console.log(seedCampaign);
        }
      });
    });
  }
};

const seedCampaignsArray = [
  {
    address: '1000 E Colfax Ave, Denver, CO 80218, USA',
    name: '1000 E Colfax Ave',
    voteCount: 0,
    latLng: { coordinates: [-104.94104400000003, 39.715318], type: 'Point' },
    id: '59ffe4bd992a9b8078a69eff',
    propertyManager: {
      name: 'Mr. Property Manager',
      address: 'Property Ville',
      phone: '555-555-555',
      email: 'mrProperty@mrproperty.com',
      city: 'Propertytownbville',
      state: 'AL',
      zip: 45094
    },
    buildingInfo: {
      numBuildings: 4,
      numUnits: 1094
    }
  },
  {
    address: '666 S Pearl St, Denver, CO 80209, USA',
    name: '666 S Pearl St',
    voteCount: 0,
    lat: 39.704423,
    lng: -104.980098,
    id: '5a007fdaa64ebd7458355900'
  },
  {
    address: '550 S Broadway, Denver, CO 80209, USA',
    name: '550 S Broadway',
    voteCount: 0,
    lat: 39.7065786,
    lng: -104.9872191,
    id: '5a008331aea2b57777bd3ceb'
  },
  {
    address: '4440 S Pearl St, Englewood, CO 80113, USA',
    name: '4440 S Pearl St',
    voteCount: 0,
    lat: 39.6359304,
    lng: -104.98059,
    id: '5a0083a347aed777f61551bf'
  },
  {
    address: '3332 S Broadway, Englewood, CO 80113, USA',
    name: '3332 S Broadway',
    voteCount: 0,
    lat: 39.656175,
    lng: -104.98722900000001,
    id: '5a0083e84bc6407832d8e94c'
  },
  {
    address: '2301 E Colfax Ave, Denver, CO 80206, USA',
    name: '2301 E Colfax Ave',
    voteCount: 0,
    lat: 39.740175,
    lng: -104.95964630000003,
    id: '5a0103bdccded61315cd6e71'
  }
];

module.exports = seedCampaigns;
