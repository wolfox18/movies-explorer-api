import { constants } from 'http2';
import { Movie } from '../models/movies.js';
import {
  NotFoundError, BadRequestError, ForbiddenError,
} from '../utils/errors.js';
import { messages } from '../utils/utils.js';

export const readAll = (req, res, next) => {
  Movie.find({}).populate('owner')
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      next(err);
    });
};

export const create = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailerLink, thumbnail, movieId, nameRU, nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movieDocument) => {
      const card = movieDocument.toObject();
      card.owner = { _id: req.user._id };
      res.status(constants.HTTP_STATUS_CREATED).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(messages.invalidDataMessage));
      } else next(err);
    });
};

export const deleteById = (req, res, next) => {
  Movie.findById({ _id: req.params.id })
    .then((movie) => {
      if (!movie) {
        throw (new NotFoundError('Фильм не найден'));
      } else if (movie.owner.toString() !== req.user._id) {
        throw (new ForbiddenError(messages.youCantDeletNotYourMovieMessage));
      } else {
        return movie.remove();
      }
    })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(messages.invalidDataMessage));
      } else next(err);
    });
};
