/* eslint no-console: 0*/
const User = require('../backend/models/User');

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
    name: 'Danny R',
    email: 'DR@gmail.com',
    _id: '5ad27df4b5026ef7f8a6bcb3'
  },
  {
    name: 'Hoop',
    email: 'hoop@gmail.com',
    _id: '5ad27d0d829e17f7343211f8'
  },
  {
    name: 'CM',
    email: 'CM@aol.com',
    _id: '5ad27e30c0a61bf827d2fd52'
  },
  {
    name: 'Tommasina ',
    email: 'tommasina@yahoo.com',
    _id: '5ad27e30c0a61bf827d2fd53'
  },
  {
    name: 'Ximsce',
    email: 'ximsce@yolo.org',
    _id: '5ad27e30c0a61bf827d2fd54'
  },
  {
    name: 'Chang',
    email: 'LE@gmail.com',
    _id: '5ad27e30c0a61bf827d2fd55'
  },
  {
    name: 'Fireman ',
    email: 'fireman@gmail.com',
    _id: '5ad27e30c0a61bf827d2fd56'
  },
  {
    googleID: '105997181103069737103',
    name: 'The_Ryan_Brooks.net',
    email: 'The_Ryan_Brooks_net@net.com'
  }
];

module.exports = seedUsers;
