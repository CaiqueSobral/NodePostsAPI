import express, { NextFunction, Request, Response } from 'express';
import * as feedRoute from './routes/feed';
import * as authRoute from './routes/auth';
import bodyParser from 'body-parser';
import { env } from 'process';
import dotenv from 'dotenv';
import { HttpError } from './helpers/errors/httpError';
import mongoose from 'mongoose';

const app = express();

dotenv.config();
app.use(bodyParser.json());
app.use((_, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization');
  next();
});
app.use('/feed', feedRoute.router);
app.use('/auth', authRoute.router);

app.use(
  (error: HttpError, _: Request, res: Response, __: NextFunction): void => {
    console.log(error);
    const message = error.message;
    const status = error.statusCode || 500;
    res.status(status).json({ message: message });
  }
);

(async () => {
  try {
    await mongoose.connect(`${env.DB_LINK}`);
    app.listen(8080, () => console.log('App listening on port 8080'));
  } catch (err) {
    console.log(err);
  }
})();
