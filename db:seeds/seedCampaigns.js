/* eslint no-console: 0*/
const Campaign = require('../backend/models/Campaign');

const seedCampaigns = {
  removeCampaigns: async function() {
    let remove;
    try {
      remove = await Campaign.remove({}, function(err) {
        console.log(remove);
        if (err) {
          console.log(err);
        } else {
          console.log(
            '\n\n##################\n\n All Seed Campaigns Removed\n\n##################\n\n'
          );
        }
      });
    } catch (e) {
      console.log(e);
    }
    return remove;
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
          console.log('Seeded a campaign ', seedCampaign);
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
    latLng: {
      coordinates: [parseFloat(-104.94104400000003), parseFloat(39.715318)],
      type: 'Point'
    },
    _id: '59ffe4bd992a9b8078a69eff',
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
    latLng: {
      coordinates: [parseFloat(-104.980098), parseFloat(39.704423)],
      type: 'Point'
    },
    _id: '5a007fdaa64ebd7458355900'
  },
  {
    address: '550 S Broadway, Denver, CO 80209, USA',
    name: '550 S Broadway',
    voteCount: 0,
    latLng: {
      coordinates: [parseFloat(-104.9872191), parseFloat(39.7065786)],
      type: 'Point'
    },
    _id: '5a008331aea2b57777bd3ceb'
  },
  {
    address: '4440 S Pearl St, Englewood, CO 80113, USA',
    name: '4440 S Pearl St',
    voteCount: 0,
    latLng: {
      coordinates: [parseFloat(-104.98059), parseFloat(39.6359304)],
      type: 'Point'
    },
    _id: '5a0083a347aed777f61551bf'
  },
  {
    address: '3332 S Broadway, Englewood, CO 80113, USA',
    name: '3332 S Broadway',
    voteCount: 0,
    latLng: {
      coordinates: [parseFloat(-104.98722900000001), parseFloat(39.656175)],
      type: 'Point'
    },
    _id: '5a0083e84bc6407832d8e94c'
  },
  {
    address: '2301 E Colfax Ave, Denver, CO 80206, USA',
    name: '2301 E Colfax Ave',
    voteCount: 0,
    latLng: {
      coordinates: [parseFloat(-104.95964630000003), parseFloat(39.740175)],
      type: 'Point'
    },
    _id: '5a0103bdccded61315cd6e71'
  }
];

module.exports = seedCampaigns;
