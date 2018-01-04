const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');
const User = mongoose.model('User');

module.exports = app => {
  app.get('/api/comments/:id', async (req, res) => {
    const campaign_id = req.params.id;

    try {
      const comments = await Comment.find({ campaignID: campaign_id });
      res.send(comments);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.post('/api/comments/:id', async (req, res) => {
    const { user_id, campaign_id, message, parent_id } = req.body;
    const user = await User.findOne({ _id: user_id });
    let comObj = {
      userName: user.name,
      message
    };
    if (campaign_id) {
      comObj['campaignID'] = campaign_id;
    }

    const comment = new Comment(comObj);

    try {
      const savedComment = await comment.save();
      if (parent_id) {
        const parent = await Comment.findOne({ _id: parent_id });
        parent.children.push(savedComment._id);
        var savedParent = await parent.save();
        res.send({ savedComment, savedParent });
      } else {
        res.send({ savedComment });
      }
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
