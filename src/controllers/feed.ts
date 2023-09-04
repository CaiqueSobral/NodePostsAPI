import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator/src/validation-result';
import { postModel } from '../models/post';
import { HttpError } from '../helpers/errors/httpError';
import mongoose from 'mongoose';

export const getPosts = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await postModel.find();
    res.status(200).json(posts.reverse());
  } catch (err) {
    const error = new HttpError(String(err), 422);
    next(error);
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

export const getPostById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.postId;
  checkValidId(id, next);
  try {
    const post = await postModel.findById(id);
    if (!post) {
      throw new HttpError('Post not found', 404);
    }
    res.status(200).json(post);
  } catch (err) {
    next(new HttpError(String(err), 404));
  }
};

export const updatePostById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.postId;
  checkValidId(id, next);

  const { title, content, creator } = req.body;
  try {
    const post = await postModel.findById(id);
    if (!post) throw new HttpError('Post not found', 404);

    post.title = title;
    post.content = content;
    post.creator = creator;
    const updatedPost = await post.save();
    res.status(200).json({ message: 'post updated', post: updatedPost });
  } catch (err) {
    next(new HttpError(String(err), 404));
  }
};

export const deletePostById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.postId;
  checkValidId(id, next);

  try {
    const post = await postModel.findById(id);
    if (!post) throw new HttpError('Post not found', 404);

    await postModel.findByIdAndDelete(id);
    res.status(200).json({
      message: 'Post deleted',
    });
  } catch (err) {
    next(new HttpError(String(err), 404));
  }
};

const checkValidId = (id: string, next: NextFunction): void => {
  if (!mongoose.Types.ObjectId.isValid(id))
    next(new HttpError('Invalid Id Type', 400));
};
