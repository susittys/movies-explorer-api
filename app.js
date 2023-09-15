import { config } from 'dotenv';

import mongoose from 'mongoose';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import limiter from './utils/rateLimiter.js';
import rootRouter from './routes/index.js';
import handlerError from './middlewares/handlerError.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';

config();

const {
  PROD_PORT, ORIGIN, HOST, PROD_DB, DEV_DB,
} = process.env;

const PORT = process.env.NODE_ENV === 'production' ? PROD_PORT : 3000;
const DB = process.env.NODE_ENV === 'production' ? PROD_DB : DEV_DB;

mongoose.connect(HOST + DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(cors({
  credentials: true,
  origin: ORIGIN,
}));

app.use(helmet());

app.use(requestLogger);

app.use(limiter);

app.use(express.json());

app.use(cookieParser());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', rootRouter);

app.use(errorLogger);

app.use(errors());

app.use(handlerError);

app.listen(PORT);
