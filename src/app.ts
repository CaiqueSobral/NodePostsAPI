import express, { NextFunction, Request, Response } from 'express';
import * as feedRoute from './routes/feed';
import bodyParser from 'body-parser';

const app = express();

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

app.listen(8080);
