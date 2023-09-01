import { Request, Response } from 'express';
import { validationResult } from 'express-validator/src/validation-result';
import { postModel } from '../models/post';

export const getPosts = (_: Request, res: Response): void => {
  res.status(200).json({
    posts: [
      {
        _id: '1',
        title: 'First Post',
        content: 'This is a first post',
        creator: {
          name: 'Caique',
        },
        date: new Date(),
      },
      {
        _id: '2',
        title: 'Second Post',
        content: 'This is the second post',
        creator: {
          name: 'Caique',
        },
        date: new Date(),
      },
      {
        _id: '3',
        title: 'Third Post',
        content: 'Yet another post',
        creator: {
          name: 'Caique',
        },
        date: new Date(),
      },
    ],
  });
};

export const postPost = (req: Request, res: Response) => {
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

  (async () => {
    try {
      const result = await post.save();
      res.status(201).json({
        message: 'Post created successfully',
        post: result,
      });
    } catch (err) {
      console.log(err);
    }
  })();
};
