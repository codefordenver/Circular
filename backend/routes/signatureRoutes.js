const mongoose = require('mongoose');
const Signature = mongoose.model('Signature');
const User = mongoose.model('User');
const async = require('async');

module.exports = app => {
  app.get('/api/signatures/campaigns/:campaignId', async (req, res) => {
    const signatures = await Signature.find({
      _campaignID: req.params.campaignId
    });

    async.map(
      signatures,
      function({ _id, _userID }, callback) {
        User.findOne({ _id: _userID }).then(user => {
          return callback(null, { name: user.name, id: user._id });
        });
      },
      function(err, results) {
        res.send(results);
      }
    );
  });

  app.get('/api/signatures/users/:userId', async (req, res) => {
    const signature = await Signature.findOne({ _userID: req.params.userId });

    res.send(signature);
  });

  app.post('/api/signatures', async (req, res) => {
    const { user_id, campaign_id, keepUpdated } = req.body;

    const currentSignature = await Signature.findOne({
      _userID: user_id,
      _campaignID: campaign_id
    });

    if (currentSignature._id) {
      res.status(422).send('user can only sign one campaign');
    } else {
      try {
        const signature = new Signature({
          _userID: user_id,
          _campaignID: campaign_id,
          _keepUpdated: keepUpdated
        });
        const data = await signature.save();

        res.send(data);
      } catch (err) {
        res.status(422).send(err);
      }
    }
  });

  app.delete('/api/signatures/:sigId', async (req, res) => {
    try {
      await Signature.deleteOne({
        _id: req.params.sigId
      });
      res.send(200);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
