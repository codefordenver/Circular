/* eslint no-console: 0*/
const Comment = require('../backend/models/Comment');

const seedComments = {
  removeComments: () => {
    Comment.remove({}, err => {
      if (err) {
        console.log(err);
      } else {
        console.log(
          '\n\n##################\n\n All Seed Comments Removed\n\n##################\n\n'
        );
      }
    });
  },
  seedComments: () => {
    console.log(
      '\n\n##################\n\n Seeding Comments \n\n##################\n\n'
    );
    seedCommentsArray.forEach(seedComment => {
      Comment.create(seedComment, (err, seedComment) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Seeded a comment ', seedComment);
        }
      });
    });
  }
};

// 5a008331aea2b57777bd3ceb
// 5a0083a347aed777f61551bf
const seedCommentsArray = [
  {
    _id: '5a57249d20ef0b600ef819c2',
    updatedAt: '2018-01-11T08:47:38.763Z',
    createdAt: '2018-01-11T08:47:25.254Z',
    userName: 'Recycle Unicorn',
    message: 'Gimme that Recyling!',
    campaignID: '59ffe4bd992a9b8078a69eff',
    children: ['5a5724aa20ef0b600ef819c4']
  },
  {
    _id: '5a5724aa20ef0b600ef819c4',
    updatedAt: '2018-01-19T08:47:38.763Z',
    createdAt: '2018-01-19T08:47:25.254Z',
    userName: 'Master Commenter',
    message: 'Me too!'
  },
  {
    _id: '5a5724a320ef0b600ef819c3',
    updatedAt: '2018-02-04T08:47:38.763Z',
    createdAt: '2018-02-04T08:47:25.254Z',
    userName: 'Oscar',
    message: 'Even I like to recycle'
  },
  {
    _id: '5acb9ab19327f85287dbdda2',
    updatedAt: '2018-02-01T08:47:38.763Z',
    createdAt: '2018-02-01T08:47:25.254Z',
    userName: 'Barry Obama',
    message: 'About time we were more eco-aware in this building!',
    campaignID: '5a007fdaa64ebd7458355900'
  }
];

module.exports = seedComments;
