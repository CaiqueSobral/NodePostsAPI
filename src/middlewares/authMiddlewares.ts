import { body } from 'express-validator';
import { userModel } from '../models/user';

export const authMiddle = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom((value, { req }) => {
      return userModel.findOne({ email: value }).then((userDoc) => {
        if (userDoc) {
          return Promise.reject('Email address already exists!');
        }
      });
    })
    .normalizeEmail(),
  body('password').trim().isLength({ min: 5 }),
  body('name').trim().notEmpty(),
];
