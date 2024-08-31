import express from 'express';
import { SlotControllers } from './slot.controller';
import auth from '../../config/middlewares/auth';

const router = express.Router();

//this route transfer to service route;
// router.post(
//   '/',
//   auth('admin'),
//   validateRequest(SlotValidationSchema.createSlotValidationSchema),
//   SlotControllers.createSlots
// );

router.get('/availability', SlotControllers.getAvailableSlots);

router.put('/update-slot/:id', auth('admin'), SlotControllers.updateASlot);

router.delete('/:id', auth('admin'), SlotControllers.deleteASlot);

export const SlotRoutes = router;
