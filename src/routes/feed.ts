import express from 'express';
import * as postController from '../controllers/feed';
import { body } from 'express-validator';

export const router = express.Router();
router.get('/posts', postController.getPosts);
router.post(
  '/post',
  [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 }),
  ],
  postController.postPost
);
router.get('/post/:postId', postController.getPostById);
router.put('/post/:postId', postController.updatePostById);
router.delete('/post/:postId', postController.deletePostById);
