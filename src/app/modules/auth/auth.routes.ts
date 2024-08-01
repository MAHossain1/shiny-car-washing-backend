import express from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../config/middlewares/validateRequest';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.LoginUser
);

export const AuthRoutes = router;
