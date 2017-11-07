/*eslint no-unused-vars: 0*/
const GeoJSON = require('mongoose-geojson-schema');
const mongoose = require('mongoose');
const { Schema } = mongoose;

var SchemaTypes = mongoose.Schema.Types;

const campaignSchema = new Schema(
	{
		name: { type: String, required: true, unique: true },
		address: { type: String, required: true },
		latLng: { type: SchemaTypes.GeoJSON, required: true },
		voteCount: { type: Number, default: 0 },
		propertyManager: {
			name: { type: String },
			address: { type: String },
			phone: { type: Number },
			email: { type: String }
		},
		wasteProvider: {
			name: { type: String },
			phone: { type: Number },
			email: { type: String }
		},
		unitCount: {
			type: Number
		}
	},
	{ timestamps: true }
);

campaignSchema.index({ latLng: "2dsphere" });

mongoose.model("Campaign", campaignSchema);
