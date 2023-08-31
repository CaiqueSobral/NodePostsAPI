import { Request, Response, NextFunction } from 'express';

export const getPosts = (
  req: Request,
  res: Response,
  _: NextFunction
): void => {
  res.status(200).json({
    posts: [
      {
        title: 'First Post',
        content: 'This is a first post',
      },
      {
        title: 'Second Post',
        content: 'This is the second post',
      },
      {
        title: 'Third Post',
        content: 'Yet another post',
      },
    ],
  });
};

export const postPost = (req: Request, res: Response) => {
  const title = req.body.title;
  const content = req.body.content;

  res.status(201).json({
    message: 'Post created',
    post: {
      title: title,
      content: content,
    },
  });
};
