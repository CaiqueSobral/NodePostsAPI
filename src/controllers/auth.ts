import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { userModel } from '../models/user';
import { HttpError } from '../helpers/errors/httpError';

export const signUp = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new HttpError('Validation Failed', 422);

  const { email, name, password } = req.body;
};
