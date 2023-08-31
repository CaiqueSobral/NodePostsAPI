import express from 'express';
import * as postController from '../controllers/feed';

export const router = express.Router();
router.get('/posts', postController.getPosts);
router.post('/posts', postController.postPost);
