import express from 'express';
import validateRequest from '../../config/middlewares/validateRequest';
import { UserValidationSchema } from './user.validation';
import { UserControllers } from './user.controller';
import auth from '../../config/middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserValidationSchema.createUserZodValidation),
  UserControllers.createUser
);

router.get('/', auth(USER_ROLE.admin), UserControllers.getAllUsers);

export const UserRoutes = router;
