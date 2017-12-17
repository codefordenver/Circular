const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    _userID: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    children: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ],
    campaignID: {
      type: String
    },
    message: { type: String, required: true }
  },
  { timestamps: true }
);

var autoPopulateChildren = function(next) {
  this.populate('children');
  next();
};

commentSchema
  .pre('findOne', autoPopulateChildren)
  .pre('find', autoPopulateChildren);

mongoose.model('Comment', commentSchema);
