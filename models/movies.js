import mongoose, { Schema } from 'mongoose';
import validator from 'validator';

const filmSchema = new Schema({
  country: {
    type: String,
    reqired: true,
  },
  director: {
    type: String,
    reqired: true,
  },
  duration: {
    type: Number,
    reqired: true,
  },
  year: {
    type: String,
    reqired: true,
  },
  description: {
    type: String,
    reqired: true,
  },
  image: {
    type: String,
    reqired: true,
    validate: {
      validator: (url) => validator.isURL(url),
      message: () => 'Введите корректный URL',
    },
  },
  trailerLink: {
    type: String,
    reqired: true,
    validate: {
      validator: (url) => validator.isURL(url),
      message: () => 'Введите корректный URL',
    },
  },
  thumbnail: {
    type: String,
    reqired: true,
    validate: {
      validator: (url) => validator.isURL(url),
      message: () => 'Введите корректный URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String,
    reqired: true,
  },
  nameRU: {
    type: String,
    reqired: true,
  },
  nameEN: {
    type: String,
    reqired: true,
  },
});

export const Movie = mongoose.model('movies', filmSchema);
