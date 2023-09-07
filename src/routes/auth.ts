import { Router } from 'express';
import * as authController from '../controllers/auth';
import { authMiddle } from '../middlewares/authMiddlewares';

export const router = Router();

router.put('/signup', authMiddle, authController.signUp);
