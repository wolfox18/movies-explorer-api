import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { errors } from 'celebrate';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import { usersRouter, moviesRouter, signRouter } from './routes/index.js';
import { auth } from './middlewares/auth.js';
import { NotFoundError } from './utils/errors.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';
import { errorsHandler } from './middlewares/errors.js';
import { messages } from './utils/utils.js';
import { limiter } from './middlewares/limiter.js';

const { PORT = 3102 } = process.env;
const config = dotenv.config({
  path: path
    .resolve(process.env.NODE_ENV === 'production' ? '.env' : '.env.common'),
})
  .parsed;

const app = express();
const { dbName } = config;

mongoose.connect(dbName, {
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

app.use(limiter);
app.use(helmet());

app.use('/', signRouter);
app.use(auth);
app.use('/', usersRouter);
app.use('/', moviesRouter);
app.use('*', (req, res, next) => next(new NotFoundError(messages.pageNotFoundErrorMessage)));

app.use(errorLogger);
app.use(errors());
// централизованный обработчик ошибок
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
