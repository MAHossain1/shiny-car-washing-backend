import express from 'express';
import { SlotControllers } from './slot.controller';

const router = express.Router();

//this route transfer to service route;
// router.post(
//   '/',
//   auth('admin'),
//   validateRequest(SlotValidationSchema.createSlotValidationSchema),
//   SlotControllers.createSlots
// );

router.get('/availability', SlotControllers.getAvailableSlots);

export const SlotRoutes = router;
