import { Router } from 'express';
import { celebrateUserLogin, celebrateUserCreate } from '../validation/users.js';
import { login, createUser } from '../controllers/users.js';

export const signRouter = Router();
signRouter.post('/signin', celebrateUserLogin, login);
signRouter.post('/signup', celebrateUserCreate, createUser);
