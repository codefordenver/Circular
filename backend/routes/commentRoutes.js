const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');

module.exports = app => {
  app.get('/api/comments/:id', async (req, res) => {
    const campaign_id = req.params.id;

    try {
      const comments = await Comment.findOne({ campaignID: campaign_id });
      res.send(comments);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.post('/api/comments/:id', async (req, res) => {
    const { user_id, campaign_id, message, parent_id } = req.body;
    let comObj = {
      _userID: user_id,
      message
    };
    if (campaign_id) {
      comObj['_campaignID'] = campaign_id;
    }

    const comment = new Comment(comObj);

    try {
      const childData = await comment.save();
      if (parent_id) {
        const parent = await Comment.findOne({ _id: parent_id });
        parent.children.push(childData._id);
        var parentData = await parent.save();
        res.send({ childData, parentData });
      } else {
        res.send({ childData });
      }
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
