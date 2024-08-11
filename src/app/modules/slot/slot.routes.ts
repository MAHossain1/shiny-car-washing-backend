import express from 'express';
import auth from '../../config/middlewares/auth';
import validateRequest from '../../config/middlewares/validateRequest';
import { SlotValidationSchema } from './slot.validation';
import { SlotControllers } from './slot.controller';

const router = express.Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(SlotValidationSchema.createSlotValidationSchema),
  SlotControllers.createSlots
);

export const SlotRoutes = router;
