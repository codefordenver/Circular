/* eslint-disable no-console */
const { campaignsRef, GeoPoint } = require('./index.js');

const campaignSeeds = [
  {
    campaignId: 'tJrvtzORhxYLkTbmCSsy',
    address: '1644 Platte Street, Denver, CO, USA',
    latLng: new GeoPoint(39.7576196, -105.0069694),
    createdAt: new Date('2018-08-07T02:42:03.672Z'),
    modifiedAt: new Date('2018-08-07T02:42:03.672Z'),
    wasteProvider: {
      name: 'Alpine Waste & Recycling',
      address: '',
      phone: '303-744-9881',
      email: 'srcaulk@proconnectpr.com'
    },
    propertyManager: {
      name: 'Test Manager',
      address: '123 Test Avenue, Denver CO, 80202 ',
      phone: '555-555-5555',
      email: 'test@testemail.com'
    },
    buildingInformation: {
      numBuildings: '1',
      numUnits: '20'
    }
  },
  {
    campaignId: 'fLYFQlOwGcyaoZveEIzA',
    address: '222 Corona Street, Denver, CO, USA',
    latLng: new GeoPoint(39.7124267, -104.9742877),
    createdAt: new Date('2018-08-07T02:42:03.672Z'),
    modifiedAt: new Date('2018-08-07T02:42:03.672Z'),
    wasteProvider: {
      name: 'Alpine Waste & Recycling',
      address: '',
      phone: '303-744-9881',
      email: 'srcaulk@proconnectpr.com'
    },
    propertyManager: {
      name: 'Test Manager 3',
      address: '444 Test Avenue, Denver CO, 80202 ',
      phone: '444-444-5555',
      email: 'test6@testemail.com'
    },
    buildingInformation: {
      numBuildings: '5',
      numUnits: '100'
    }
  },
  {
    campaignId: '2HyKvLWQ03TIpa1Wq8K4',
    address: '100 Park Avenue West, Denver, CO, USA',
    latLng: new GeoPoint(39.747910399999988, -104.97952429999998),
    createdAt: new Date('2018-08-07T02:42:03.672Z'),
    modifiedAt: new Date('2018-08-07T02:42:03.672Z'),
    wasteProvider: {
      name: 'Mr. Waste',
      address: '888 Waste Land, Denver, CO, 80333',
      phone: '888-111-1111',
      email: 'waster@waster.com'
    },
    propertyManager: {
      name: 'Mrs. Manager',
      address: '888 Manager Avenue, Denver CO, 80302 ',
      phone: '888-888-8888',
      email: 'test8@testemail.com'
    },
    buildingInformation: {
      numBuildings: '1',
      numUnits: '11'
    }
  },
  {
    campaignId: 'ZuQeT0HIf5zisFT8VMzI',
    address: '3242 East Colfax Avenue, Denver, CO, USA',
    latLng: new GeoPoint(39.7006302, -105.006059),
    createdAt: new Date('2018-08-07T02:42:03.672Z'),
    modifiedAt: new Date('2018-08-07T02:42:03.672Z'),
    wasteProvider: {
      name: 'Mr. Waste',
      address: '555 Waste Land, Denver, CO, 80333',
      phone: '111-111-1111',
      email: 'wasted@wasted.com'
    },
    propertyManager: {
      name: 'Mrs. Manager',
      address: '999 Manager Avenue, Denver CO, 80302 ',
      phone: '999-999-9999',
      email: 'test5@testemail.com'
    },
    buildingInformation: {
      numBuildings: '3',
      numUnits: '22'
    }
  }
];

const seedCampaigns = {
  seedCampaigns() {
    campaignSeeds.forEach(campaign => {
      campaignsRef
        .doc(campaign.campaignId)
        .set({
          ...campaign
        })
        .then(() => {
          console.log(`Set campaign ${campaign.campaignId}`);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
};

module.exports = seedCampaigns;
