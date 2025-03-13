import { Schema, model } from 'mongoose';

const ExoplanetSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  distance: {
    type: Number,
    required: true
  },
  discoveryYear: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  imageUrl: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default model('Exoplanet', ExoplanetSchema);