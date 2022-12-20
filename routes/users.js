import { Router } from 'express';
import {
  readMe, editMe,
} from '../controllers/users.js';
import { celebrateUserEdit } from '../validation/users.js';

export const usersRouter = Router();

usersRouter.get('/users/me', readMe);
usersRouter.patch('/users/me', celebrateUserEdit, editMe);
