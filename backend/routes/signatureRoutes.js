const mongoose = require('mongoose');
const Signature = mongoose.model('Signature');
const User = mongoose.model('User');
const _ = require('lodash');
const async = require('async');
const Path = require('path-parser');
const { URL } = require('url');

module.exports = app => {
  app.get('/api/signatures/:id', async (req, res) => {
    const signatures = await Signature.find({ _campaignID: req.params.id });

    async.map(
      signatures,
      function({ _id, _userID }, callback) {
        User.findOne({ _id: _userID }).then(user => {
          return callback(null, { name: user.name, id: _id });
        });
      },
      function(err, results) {
        res.send(results);
      }
    );
  });

  app.post('/api/signatures', async (req, res) => {
    const { user_id, campaign_id } = req.body;

    const signature = new Signature({
      _userID: user_id,
      _campaignID: campaign_id
    });

    try {
      const data = await signature.save();

      res.send(data);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
