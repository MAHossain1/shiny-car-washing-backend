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

router.post('/change-password', AuthControllers.changePassword);

export const AuthRoutes = router;
