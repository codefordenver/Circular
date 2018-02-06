const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: String,
  name: String,
  email: String,
  facebookID: String
});

mongoose.model('User', userSchema);
