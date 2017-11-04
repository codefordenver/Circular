const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: String,
  name: String,
  email: String
});

mongoose.model('User', userSchema);
