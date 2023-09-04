import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator/src/validation-result';
import { postModel } from '../models/post';
import { HttpError } from '../helpers/errors/httpError';

export const getPosts = async (_: Request, res: Response) => {
  try {
    const posts = await postModel.find();
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
  }
};

export const postPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(
      'Validation failed, Content does not meet requirements.',
      422
    );
    next(error);
  }

  const body = req.body;
  const post = new postModel({
    title: body.title,
    content: body.content,
    creator: body.creator,
  });

  try {
    const result = await post.save();
    res.status(201).json({
      message: 'Post created successfully',
      post: result,
    });
  } catch (err) {
    const error = new HttpError(String(err), 422);
    next(error);
  }
};
