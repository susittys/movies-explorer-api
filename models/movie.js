import mongoose from 'mongoose';
import isURL from 'validator/lib/isURL.js';

const movieSchema = new mongoose.Schema(
  {
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: isURL,
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: isURL,
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator: isURL,
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

export default mongoose.model('movie', movieSchema);
