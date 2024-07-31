import express from 'express';
import validateRequest from '../../config/middlewares/validateRequest';
import { UserValidationSchema } from './user.validation';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserValidationSchema.createUserZodValidation),
  UserControllers.createUser
);

export const UserRoutes = router;
