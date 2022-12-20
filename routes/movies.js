import { Router } from 'express';
import {
  readAll, deleteById, create,
} from '../controllers/movies.js';
import { celebrateMovieCreate, celebrateMovieId } from '../validation/movies.js';

export const moviesRouter = Router();

moviesRouter.get('/movies', readAll);
moviesRouter.post('/movies', celebrateMovieCreate, create);
moviesRouter.delete('/movies/:id', celebrateMovieId, deleteById);
