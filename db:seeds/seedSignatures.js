/* eslint no-console: 0*/
const Signature = require('../backend/models/Signature');

const seedSignatures = {
  removeSignatures: function() {
    Signature.remove({}, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log(
          '\n\n##################\n\n All Seed Signatures Removed \n\n##################\n\n'
        );
      }
    });
  },
  seedSignatures: function() {
    seedSignaturesArray.forEach(function(seedSignature) {
      Signature.create(seedSignature, function(err, seedSignature) {
        if (err) {
          console.log(err);
        } else {
          console.log('Seeded Signature: ', seedSignature);
        }
      });
    });
  }
};

const seedSignaturesArray = [
  {
    // Ryan Brooks
    _userID: '5aa97763feb54159e122b7e5',
    _SignatureID: '5a25fe15bd5f014df6d6e611',
    _campaignID: '59ffe4bd992a9b8078a69eff',
    _id: '5ad27df4b5026ef7f8a6bcb3',
    _keepUpdated: false
  },
  {
    // Ximsce
    _userID: '5ad27e30c0a61bf827d2fd54',
    _SignatureID: '5a010a54c4c62b2a610d1c70',
    _campaignID: '59ffe4bd992a9b8078a69eff',
    _keepUpdated: true
  },
  {
    // Hooper
    _userID: '5ad27d0d829e17f7343211f8',
    _SignatureID: '5a2602f24a8903762301c664',
    _campaignID: '5a008331aea2b57777bd3ceb',
    _keepUpdated: true
  },
  {
    // Le
    _userID: '5ad27e30c0a61bf827d2fd55',
    _SignatureID: '5a73e0c0d234bc2ae8cf6811',
    _campaignID: '5a0083e84bc6407832d8e94c',
    _keepUpdated: true
  },
  {
    // Tommasina
    _userID: '5a0103c0ccded61315cd6e72',
    _SignatureID: '5a61620a5676408cd6d9007e',
    _campaignID: '5a0103bdccded61315cd6e71',
    _keepUpdated: true
  }
];

module.exports = seedSignatures;
