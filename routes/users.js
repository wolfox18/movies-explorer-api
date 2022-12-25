import { Router } from 'express';
import { celebrateUserEdit } from '../validation/users.js';
import { editMe, readMe } from '../controllers/users.js';

export const usersRouter = Router();
usersRouter.get('/me', readMe);
usersRouter.patch('/me', celebrateUserEdit, editMe);
