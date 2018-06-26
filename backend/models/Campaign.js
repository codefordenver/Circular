/*eslint no-unused-vars: 0*/
const GeoJSON = require('mongoose-geojson-schema');
const mongoose = require('mongoose');
const { Schema } = mongoose;

var SchemaTypes = mongoose.Schema.Types;

const campaignSchema = new Schema(
  {
    // name: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    latLng: { type: SchemaTypes.GeoJSON, required: true },
    voteCount: { type: Number, default: 0 },
    propertyManager: {
      name: { type: String },
      address: { type: String },
      phone: { type: String },
      email: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String }
    },
    _wasteProviderId: {
      type: Schema.Types.ObjectId,
      ref: 'WasteProvider',
      required: false
    },
    buildingInfo: {
      numBuildings: { type: Number },
      numUnits: { type: Number }
    }
  },
  { timestamps: true }
);

campaignSchema.index({ latLng: '2dsphere' });

mongoose.model('Campaign', campaignSchema);
