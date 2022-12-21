import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { errors } from 'celebrate';
import { constants } from 'http2';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import { usersRouter } from './routes/users.js';
import { moviesRouter } from './routes/movies.js';
import { signRouter } from './routes/sign.js';
import { auth } from './middlewares/auth.js';
import { NotFoundError } from './utils/errors.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';

const { PORT = 3102 } = process.env;
const config = dotenv.config({
  path: path
    .resolve(process.env.NODE_ENV === 'production' ? '.env' : '.env.common'),
})
  .parsed;

const app = express();

mongoose.connect('mongodb://localhost:27017/moviedb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors({
  origin: '*',
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.json());

app.set('config', config);
app.use(requestLogger);

app.use('/', signRouter);

app.use(auth);

app.use('/', usersRouter);
app.use('/', moviesRouter);

app.use('*', (req, res, next) => next(new NotFoundError('Страница не найдена')));

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  if (err.statusCode) res.status(err.statusCode).send({ message: err.message });
  else res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Неизвестная ошибка' });
  next();
});
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
