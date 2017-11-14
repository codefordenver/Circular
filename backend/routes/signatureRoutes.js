const mongoose = require('mongoose');
const Signature = mongoose.model('Signature');
const User = mongoose.model('User');
const async = require('async');

module.exports = app => {
  const sendCampaignSignatures = (arr, res) =>
    async.map(
      arr,
      function({ _id, _userID }, callback) {
        User.findOne({ _id: _userID }).then(user => {
          return callback(null, { name: user.name, id: _id });
        });
      },
      function(err, results) {
        res.send(results);
      }
    );

  app.get('/api/signatures/:id', async (req, res) => {
    const signatures = await Signature.find({ _campaignID: req.params.id });

    sendCampaignSignatures(signatures, res);
  });

  app.post('/api/signatures', async (req, res) => {
    const { userData, campaignID, keepUpdated } = req.body;
    const { id: googleID, email, name, firstName, lastName, profilePicURL } = userData;
    const thisUser = await User.findOne({ googleID: googleID });
    let userID = '';

    if (!thisUser) {
      const newUser = new User({
        googleID,
        email,
        name,
        firstName,
        lastName,
        profilePicURL
      });
      try {
        const data = await newUser.save();
        userID = data.id;
      } catch (err) {
        console.log(err);
      }
    } else {
      userID = thisUser._id;
    }

    const signature = new Signature({
      _userID: userID,
      _campaignID: campaignID,
      _keepUpdated: keepUpdated
    });

    try {
      const thisSignature = await signature.save();
      const { name, _id } = await User.findOne({ _id: thisSignature._userID });
      res.send({ name, id: _id });
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
