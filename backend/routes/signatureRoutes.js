const mongoose = require('mongoose');
const Signature = mongoose.model('Signature');
const User = mongoose.model('User');
const async = require('async');

module.exports = app => {
  app.get('/api/signatures/:id', async (req, res) => {
    const signatures = await Signature.find({ _campaignID: req.params.id });

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

  app.post('/api/signatures', async (req, res) => {
    const { user_id, campaign_id, keepUpdated } = req.body;

    const signature = new Signature({
      _userID: user_id,
      _campaignID: campaign_id,
      _keepUpdated: keepUpdated
    });

    const user = await User.find({ _id: user_id });
    if (user.signedCampaign) {
      res.status(422).send('user cannot sign more than one campaign');
    }

    try {
      // batch this with adding the signature to the user.
      //  ?  check to see that the user hasnt already signed another with a query

      //  prevented on the front end UI with a query check that the user has not already signed a petition
      const data = await signature.save();

      res.send(data);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.delete('/api/signatures', async (req, res) => {
    const { user_id, campaign_id } = req.body;

    //  remove vote from user if signature exists
    //  remove vote from signature BD based on user_id and campaign_id if it exists

    // if either of these fail return an error code.
  });
};
