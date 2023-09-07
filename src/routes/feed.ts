import express from 'express';
import * as postController from '../controllers/feed';
import { postMiddle } from '../middlewares/feedMiddlewares';

export const router = express.Router();
router.get('/posts', postController.getPosts);
router.post('/post', postMiddle, postController.postPost);
router.get('/post/:postId', postController.getPostById);
router.put('/post/:postId', postController.updatePostById);
router.delete('/post/:postId', postController.deletePostById);
