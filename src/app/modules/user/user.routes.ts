import express from 'express';
import auth from '../../config/middlewares/auth';
import { USER_ROLE } from './user.constant';
import { UserControllers } from './user.controller';

const router = express.Router();

router.get('/', auth(USER_ROLE.admin), UserControllers.getAllUsers);

router.put('/:id', auth('admin'), UserControllers.updateAUser);

export const UserRoutes = router;
