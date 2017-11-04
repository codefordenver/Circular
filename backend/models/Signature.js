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

signatureSchema.index({ _userID: 1, _campaignID: -1 }, { unique: true });

mongoose.model('Signature', signatureSchema);
