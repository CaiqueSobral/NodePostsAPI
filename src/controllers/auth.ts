import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { userModel } from '../models/user';
import { HttpError } from '../helpers/errors/httpError';
import bcrypt from 'bcryptjs';

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) next(new HttpError('Validation Failed', 422));

  const { email, name, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new userModel({
      email: email,
      password: hashedPassword,
      name: name,
    });
    const result = await user.save();
    res.status(201).json({
      message: 'User created',
      userId: result._id,
    });
  } catch (err) {
    next(err);
  }
};
