const User = require('../models/User');

const seedUsers = {
  removeUsers: function() {
    User.remove({}, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log(
          '\n\n##################\n\n All Seed Users Removed \n\n##################\n\n'
        );
      }
    });
  },
  seedUsers: function() {
    seedUsersArray.forEach(seedUser => {
      User.create(seedUser, (err, seedUser) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Seeded User: ', seedUser);
        }
      });
    });
  }
};

const seedUsersArray = [
  {
    googleID: '105416356746150269783',
    name: 'Danny Radden',
    email: 'dradden@gmail.com',
    _id: '5ad27df4b5026ef7f8a6bcb3'
  },
  {
    googleID: '101619344957577501235',
    name: 'Matt Hooper',
    email: 'mhooper72@gmail.com',
    _id: '5ad27d0d829e17f7343211f8'
  },
  {
    googleID: '104415924344202606472',
    name: 'Casey Metz',
    email: 'caseymetz@gmail.com',
    _id: '5ad27e30c0a61bf827d2fd52'
  },
  {
    googleID: '104581398661975909168',
    name: 'Tommasina M',
    email: 'tommasina1@gmail.com',
    _id: '5ad27e30c0a61bf827d2fd53'
  },
  {
    googleID: '103521683347127792316',
    name: 'Ximsce Inconnu',
    email: 'ximsce@gmail.com',
    _id: '5ad27e30c0a61bf827d2fd54'
  },
  {
    googleID: '100832533241023708691',
    name: 'Le Chang',
    email: 'lechangcs@gmail.com',
    _id: '5ad27e30c0a61bf827d2fd55'
  },
  {
    googleID: '117636735815249339680',
    name: 'Scott Firestone',
    email: 'scottfir@gmail.com',
    _id: '5ad27e30c0a61bf827d2fd56'
  },
  {
    _id: '5aa97763feb54159e122b7e5',
    googleID: '105997181103069737103',
    name: 'The_Ryan_Brooks.net',
    email: 'the.ryan.brooks@gmail.com'
  }
];

module.exports = seedUsers;
