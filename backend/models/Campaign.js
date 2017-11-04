const mongoose = require('mongoose');
const { Schema } = mongoose;

var SchemaTypes = mongoose.Schema.Types;

const campaignSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    latLng: { type: SchemaTypes.GeoJSON, required: true },
    voteCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

campaignSchema.index({ latLng: '2dsphere' });

mongoose.model('Campaign', campaignSchema);
