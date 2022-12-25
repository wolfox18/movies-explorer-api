import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { errors } from 'celebrate';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import { appRouter } from './routes/index.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';
import { errorsHandler } from './middlewares/errors.js';
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

app.use(appRouter);

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
