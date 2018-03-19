const mongoose = require('mongoose');
const { Schema } = mongoose;

const wasteProviderSchema = new Schema({
  name: { type: String },
  phone: { type: String },
  email: { type: String }
});

mongoose.model('WasteProvider', wasteProviderSchema);
