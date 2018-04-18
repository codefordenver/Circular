/* eslint no-console: 0*/
const WasteProvider = require('../backend/models/WasteProvider');

const seedWasteProviders = {
  removeWasteProviders: function() {
    WasteProvider.remove({}, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log(
          '\n\n###################\n\nAll Seed Waste Providers Removed\n\n##################\n\n'
        );
      }
    });
  },
  seedWasteProviders: function() {
    console.log(
      '\n\n################\n\nSeeing Waste Providers \n\n#################\n\n'
    );
    seedWasteProvidersArray.forEach(seedWasteProvidersEntry => {
      WasteProvider.create(
        seedWasteProvidersEntry,
        (err, wasteProviderResult) => {
          if (err) {
            console.log(err);
          } else {
            console.log(wasteProviderResult);
          }
        }
      );
    });
  }
};

const seedWasteProvidersArray = [
  {
    _id: '5aa9bc39052f077f94c33e05',
    name: '1-800-GOT-JUNK?',
    phone: '720-744-9900',
    email: 'N/A'
  },
  {
    _id: '5aa9bc39052f077f94c33e06',
    name: '5280 Waste Solutions',
    phone: '720-884-0300',
    email: 'info@5280waste.com'
  },
  {
    _id: '5aa9bc39052f077f94c33e07',
    name: 'AA Cleanup',
    phone: '720-329-5421',
    email: 'N/A'
  },
  {
    _id: '5aa9bc39052f077f94c33e08',
    name: 'ABC Hauling Service',
    phone: '303-949-0894',
    email: 'antenna47@yahoo.com'
  },
  {
    _id: '5aa9bc39052f077f94c33e09',
    name: 'Adams Roll Off',
    phone: '303-425-4606',
    email: 'N/A'
  },
  {
    _id: '5aa9bc39052f077f94c33e0a',
    name: 'Alpine Waste & Recycling',
    phone: '303-744-9881',
    email: 'srcaulk@proconnectpr.com'
  },
  {
    _id: '5aa9bc39052f077f94c33e0b',
    name: 'American Disposal Services',
    phone: '303-288-5279',
    email: 'info@adsimail.com'
  },
  {
    _id: '5aa9bc39052f077f94c33e0c',
    name: 'Bellio Trucking Inc.',
    phone: '303-426-9629',
    email: 'N/A'
  },
  {
    _id: '5aa9bc39052f077f94c33e0d',
    name: 'Benson Roll-off Services',
    phone: '303-650-1604',
    email: 'N/A'
  },
  {
    _id: '5aa9bc39052f077f94c33e0e',
    name: 'Bin There Dump That Denver',
    phone: '720-524-3727',
    email: 'denverwest@bintheredumpthat.com'
  },
  {
    _id: '5aa9bc39052f077f94c33e0f',
    name: 'Bin There Dump That Parker',
    phone: '720-851-7888',
    email: 'N/A'
  },
  {
    _id: '5aa9bc39052f077f94c33e10',
    name: 'Blue Bear Waste Services',
    phone: '720-500-5282',
    email: 'info@bluebearwaste.com'
  },
  {
    _id: '5aa9bc39052f077f94c33e11',
    name: 'Blue Star Recyclers',
    phone: '303-534-1667',
    email: 'sam@bluestarrecyclers.com'
  },
  {
    _id: '5aa9bc39052f077f94c33e12',
    name: 'Box Brothers Roll-Off Services',
    phone: '303-465-2100',
    email: 'N/A'
  },
  {
    _id: '5aa9bc39052f077f94c33e13',
    name: 'Bricker Wilson Construction Services',
    phone: '720-317-4212',
    email: 'info@BrickerWilson@com'
  },
  {
    _id: '5aa9bc39052f077f94c33e14',
    name: 'Brothers Waste Solution',
    phone: '303-574-3164',
    email: 'N/A'
  },
  {
    _id: '5aa9bc39052f077f94c33e15',
    name: 'Clear Intentions, LLC',
    phone: '303-993-8221',
    email: 'N/A'
  },
  {
    _id: '5aa9bc39052f077f94c33e16',
    name: 'Clutter Trucker',
    phone: '720-982-7856',
    email: 'N/A'
  },
  {
    _id: '5aa9bc39052f077f94c33e17',
    name: 'College Hunks Hauling Junk',
    phone: '720-608-2600',
    email: 'StressFreeService@collegehunkshaulingjunk.com'
  },
  {
    _id: '5aa9bc39052f077f94c33e18',
    name: 'CWS Colorado, LLC',
    phone: '303-287-6655',
    email: 'jack@ateccolorado.com'
  },
  {
    _id: '5aa9bc39052f077f94c33e19',
    name: 'Curbside Roll-Off',
    phone: '303-343-7096',
    email: 'info@curbsidedatacontrol.com'
  },
  {
    _id: '5aa9bc39052f077f94c33e1a',
    name: 'Data Destruction',
    phone: '303-388-3282',
    email: 'info@data-destruction.com'
  },
  {
    _id: '5aa9bc39052f077f94c33e1b',
    name: 'Elite Roll-off Services',
    phone: '303-287-7800',
    email: 'info@eliterolloff.com'
  },
  {
    _id: '5aa9bc39052f077f94c33e1c',
    name: 'Expert Disposal',
    phone: '303-814-1808',
    email: 'N/A'
  },
  {
    _id: '5aa9bc39052f077f94c33e1d',
    name: 'Fiore and Sons',
    phone: '303-747-4073',
    email: 'info@fioreandsons.com'
  },
  {
    _id: '5aa9bc39052f077f94c33e1e',
    name: 'Garbagio',
    phone: '303-274-1500',
    email: 'N/A'
  },
  {
    _id: '5aa9bc39052f077f94c33e1f',
    name: 'Green City Waste & Recycling',
    phone: '720-644-8745',
    email: 'N/A'
  },
  {
    _id: '5aa9bc39052f077f94c33e20',
    name: 'Gone for Good',
    phone: '303-736-2387',
    email: 'info@goneforgoodstore.com'
  },
  {
    _id: '5aa9bc39052f077f94c33e21',
    name: 'Gorilla Demolition',
    phone: '303-697-1325',
    email: 'ashley@gorillademo.com'
  },
  {
    _id: '5aa9bc39052f077f94c33e22',
    name: 'Hoarder Squad',
    phone: '720-629-6288',
    email: 'N/A'
  },
  {
    _id: '5aa9bc39052f077f94c33e23',
    name: 'Home Builders Services',
    phone: '303-651-5705',
    email: 'hbsdispatch@cofence.com'
  },
  {
    _id: '5aa9bc39052f077f94c33e24',
    name: 'IT Refresh',
    phone: '970-797-2934',
    email: 'recycling@itrefresh.org'
  },
  {
    _id: '5aa9bc39052f077f94c33e25',
    name: 'J-Dog',
    phone: '720-900-3693',
    email: 'bbrier@jdog.com'
  },
  {
    _id: '5aa9bc39052f077f94c33e26',
    name: 'Jay’s Junk Removal',
    phone: '720-744-9900',
    email: 'N/A'
  },
  {
    _id: '5aa9bc39052f077f94c33e27',
    name: 'Junk Be Gone',
    phone: '720-583-0979',
    email: 'pickup@junkbegonedenver.com'
  },
  {
    _id: '5aa9bc39052f077f94c33e28',
    name: 'Junk Genius',
    phone: '303-388-7780',
    email: 'info@junkgenius.com'
  },
  {
    _id: '5aa9bc39052f077f94c33e29',
    name: 'Junk King',
    phone: '720-458-1398',
    email: 'N/A'
  },
  {
    _id: '5aa9bc39052f077f94c33e2a',
    name: 'Junkman Enterprises',
    phone: '303-777-4667',
    email: 'junkmandenver@gmail.com'
  },
  {
    _id: '5aa9bc39052f077f94c33e2b',
    name: 'Lies Waste System',
    phone: '303-286-6700',
    email: 'N/A'
  },
  {
    _id: '5aa9bc39052f077f94c33e2c',
    name: 'McDonald Farm Enterprises, Inc.',
    phone: '303-442-6829',
    email: 'dispatch@mcdonaldfarmsinc.com'
  },
  {
    _id: '5aa9bc39052f077f94c33e2d',
    name: 'METech Recycling',
    phone: '303-204-9685',
    email: 'N/A'
  },
  {
    _id: '5aa9bc39052f077f94c33e2e',
    name: 'Mile High Roll-Off Waste Systems',
    phone: '303-460-1001',
    email: 'N/A'
  },
  {
    _id: '5aa9bc39052f077f94c33e2f',
    name: 'RCI Disposal',
    phone: '303-699-6005',
    email: 'dispatch@rci-disposal.com'
  },
  {
    _id: '5aa9bc39052f077f94c33e30',
    name: 'Republic Services',
    phone: '303-286-2429',
    email: 'N/A'
  },
  {
    _id: '5aa9bc39052f077f94c33e31',
    name: 'Rocky Mountain Roll-off and Waste',
    phone: '303-478-4717',
    email: 'N/A'
  },
  {
    _id: '5aa9bc39052f077f94c33e32',
    name: 'Rubbish Works',
    phone: '720-891-4296',
    email: 'N/A'
  },
  {
    _id: '5aa9bc39052f077f94c33e33',
    name: 'Sam’s Mini Roll-Off Dumpsters',
    phone: '303-957-0737',
    email: 'N/A'
  },
  {
    _id: '5aa9bc39052f077f94c33e34',
    name: 'Storjohann Trucking',
    phone: '303-327-2263',
    email: 'DansMRock@aol.com'
  },
  {
    _id: '5aa9bc39052f077f94c33e35',
    name: 'SustainAbility',
    phone: '720.838.5907',
    email: 'info@sustainability-recycling.com'
  },
  {
    _id: '5aa9bc39052f077f94c33e36',
    name: 'Techno Rescue',
    phone: '303-482-2207',
    email: 'N/A'
  },
  {
    _id: '5aa9bc39052f077f94c33e37',
    name: 'The Junk Trunk',
    phone: '303-815-0467',
    email: 'N/A'
  },
  {
    _id: '5aa9bc39052f077f94c33e38',
    name: 'Total Disposal',
    phone: '303-374-0234',
    email: 'CustomerService@totaldisposalofdenver.com'
  },
  {
    _id: '5aa9bc39052f077f94c33e39',
    name: 'Vigils Concrete & Roll-off Service',
    phone: '303-807-4872',
    email: 'N/A'
  },
  {
    _id: '5aa9bc39052f077f94c33e3a',
    name: 'Waste Connections of Colorado',
    phone: '303-246-0627',
    email: 'N/A'
  },
  {
    _id: '5aa9bc39052f077f94c33e3b',
    name: 'Waste Management',
    phone: '303-917-7068',
    email: 'cscolorado@wm.com'
  },
  {
    _id: '5aa9bc39052f077f94c33e3c',
    name: 'Western Roll Off',
    phone: '303 765-5633',
    email: 'karl@westernrolloff.com'
  },
  {
    _id: '5aa9bc39052f077f94c33e3d',
    name: 'WM Curbside',
    phone: '1-800-449-7587',
    email: 'atyourdoor@wm.com'
  },
  {
    _id: '5aa9bc39052f077f94c33e3e',
    name: 'Yellowbox Disposal Company',
    phone: '720-493-5569',
    email: 'info@yellowboxdisposal.com'
  }
];

module.exports = seedWasteProviders;
