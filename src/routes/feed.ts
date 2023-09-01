import express from 'express';
import { body } from 'express-validator';
import * as postController from '../controllers/feed';

export const router = express.Router();
router.get('/posts', postController.getPosts);
router.post('/post', postController.postPost);
