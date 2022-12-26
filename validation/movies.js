import { Joi, celebrate } from 'celebrate';
import { urlRegEx } from '../utils/utils.js';

export const celebrateMovieCreate = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().regex(urlRegEx).required(),
    trailerLink: Joi.string().regex(urlRegEx).required(),
    thumbnail: Joi.string().regex(urlRegEx).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

export const celebrateMovieId = celebrate({
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }).required(),
});
