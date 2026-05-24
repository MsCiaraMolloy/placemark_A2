import mongoose from 'mongoose';

const { Schema } = mongoose;

const poiSchema = new Schema({
  name: String,
  description: String,
  category: String,
  location: String,
  lat: Number,
  lng: Number,
  image: String,
  userid: { type: Schema.Types.ObjectId, ref: 'User' },
  hasSolarPanels: { type: Boolean, default: false },
  hasRecyclingBin: { type: Boolean, default: false },
  hasCompostBin: { type: Boolean, default: false },
  growsOwnFood: { type: Boolean, default: false }
});

export const Poi = mongoose.models.Poi || mongoose.model('Poi', poiSchema);
