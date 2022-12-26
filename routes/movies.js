import { Router } from 'express';
import { readAll, create, deleteById } from '../controllers/movies.js';
import { celebrateMovieCreate, celebrateMovieId } from '../validation/movies.js';

export const moviesRouter = Router();
moviesRouter.get('/', readAll);
moviesRouter.post('/', celebrateMovieCreate, create);
moviesRouter.delete('/:id', celebrateMovieId, deleteById);
