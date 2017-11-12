const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: String,
  email: String,
  name: String,
  firstName: String,
  lastName: String,
  profilePicURL: String
});

mongoose.model('User', userSchema);
