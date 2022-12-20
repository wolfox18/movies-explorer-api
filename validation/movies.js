import { Joi, celebrate } from 'celebrate';
import { urlRegEx } from '../utils/utils.js';

export const celebrateMovieCreate = celebrate({
  body: Joi.object().keys({
    country: Joi.string().min(2).max(30).required(),
    director: Joi.string().min(2).max(30).required(),
    duration: Joi.number().required(),
    year: Joi.string().min(4).max(4).required(),
    description: Joi.string().min(2).max(50).required(),
    image: Joi.string().regex(urlRegEx).required(),
    trailerLink: Joi.string().regex(urlRegEx).required(),
    thumbnail: Joi.string().regex(urlRegEx).required(),
    nameRU: Joi.string().min(2).max(30).required(),
    nameEN: Joi.string().min(2).max(30).required(),
  }),
});

export const celebrateMovieId = celebrate({
  params: Joi.object({
    movieId: Joi.string().hex().length(24).required(),
  }).required(),
});
