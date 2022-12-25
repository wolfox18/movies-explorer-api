import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import { signRouter } from './sign.js';
import { usersRouter } from './users.js';
import { moviesRouter } from './movies.js';
import { NotFoundError } from '../utils/NotFoundError.js';
import { messages } from '../utils/utils.js';

export const appRouter = Router();

appRouter.use('/', signRouter);
appRouter.use(auth);
appRouter.use('/users', usersRouter);
appRouter.use('/movies', moviesRouter);

appRouter.all('/*', (req, res, next) => {
  next(new NotFoundError(messages.pageNotFoundErrorMessage));
});
