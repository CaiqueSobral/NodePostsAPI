import { Request, Response } from 'express';
import { validationResult } from 'express-validator/src/validation-result';
import { postModel } from '../models/post';

export const getPosts = async (_: Request, res: Response) => {
  try {
    const posts = await postModel.find();
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
  }
};

export const postPost = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: 'Validation failed',
      errors: errors,
    });
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
    console.log(err);
  }
};
