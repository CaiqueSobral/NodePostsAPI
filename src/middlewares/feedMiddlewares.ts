import { body } from 'express-validator';

export const postMiddle = [
  body('title').trim().isLength({ min: 5 }),
  body('content').trim().isLength({ min: 5 }),
];
