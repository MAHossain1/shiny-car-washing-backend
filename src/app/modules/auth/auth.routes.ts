import express from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../config/middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { UserValidationSchema } from '../user/user.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidationSchema.createUserZodValidation),
  AuthControllers.createUser
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.LoginUser
);

router.post('/change-password', AuthControllers.changePassword);

export const AuthRoutes = router;
