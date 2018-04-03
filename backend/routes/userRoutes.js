const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = app => {
  app.get('/api/:userId/signedCampaign', async (req, res) => {
    const user = await User.findOne({ _id: req.params.userId }).populate(
      'signedCampaign',
      'name _id'
    );

    const data = {
      user: {
        signedCampaign: user.signedCampaign
      }
    };

    res.send(data);
  });

  /* dev helper.  delete
  app.get('/api/users', async (req, res) => {
    res.send(await User.find({}));
  });
  */
};

// upon adding signature to campaign the users signedCampaign needs to be updated hold the value

// upon removing signature from campaign the user signedCampaign needs to be updated to empty
