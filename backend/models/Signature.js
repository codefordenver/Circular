const mongoose = require('mongoose');
const { Schema } = mongoose;

const signatureSchema = new Schema({
  _userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  _campaignID: {
    type: Schema.Types.ObjectId,
    ref: 'Campaign',
    required: true
  }
});

mongoose.model('Signature', signatureSchema);
