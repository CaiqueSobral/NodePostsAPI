import express, { NextFunction, Request, Response } from 'express';
import * as feedRoute from './routes/feed';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { env } from 'process';
import dotenv from 'dotenv';

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

(async () => {
  try {
    await mongoose.connect(`${env.DB_LINK}`);
    app.listen(8080, () => console.log('App listening on port 8080'));
  } catch (err) {
    console.log(err);
  }
})();
