import { Router } from 'express';
import {
  login, createUser, readMe, editMe,
} from '../controllers/users.js';
import { celebrateUserCreate, celebrateUserLogin, celebrateUserEdit } from '../validation/users.js';
import {
  readAll, deleteById, create,
} from '../controllers/movies.js';
import { celebrateMovieCreate, celebrateMovieId } from '../validation/movies.js';

export const signRouter = Router();
signRouter.post('/signin', celebrateUserLogin, login);
signRouter.post('/signup', celebrateUserCreate, createUser);

export const usersRouter = Router();
usersRouter.get('/users/me', readMe);
usersRouter.patch('/users/me', celebrateUserEdit, editMe);

export const moviesRouter = Router();
moviesRouter.get('/movies', readAll);
moviesRouter.post('/movies', celebrateMovieCreate, create);
moviesRouter.delete('/movies/:id', celebrateMovieId, deleteById);
