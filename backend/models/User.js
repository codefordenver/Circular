const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: String,
  name: String,
  email: String,
  facebookID: String,
  signedCampaign: { type: Schema.Types.ObjectId, ref: 'Campaign' }
});

mongoose.model('User', userSchema);
