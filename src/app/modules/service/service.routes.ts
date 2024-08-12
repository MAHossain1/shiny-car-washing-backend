import express from 'express';
import auth from '../../config/middlewares/auth';
import validateRequest from '../../config/middlewares/validateRequest';
import { ServiceValidationZodSchema } from './service.validation';
import { ServiceControllers } from './service.controller';
import { SlotValidationSchema } from '../slot/slot.validation';
import { SlotControllers } from '../slot/slot.controller';

const router = express.Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(ServiceValidationZodSchema.createServiceValidationSchema),
  ServiceControllers.createService
);

router.post(
  '/slots',
  auth('admin'),
  validateRequest(SlotValidationSchema.createSlotValidationSchema),
  SlotControllers.createSlots
);

router.get('/:id', ServiceControllers.getAService);

router.get('/', ServiceControllers.getAllServices);

router.put(
  '/:id',
  auth('admin'),
  validateRequest(ServiceValidationZodSchema.updateServiceValidationSchema),
  ServiceControllers.updateAService
);

router.delete('/:id', auth('admin'), ServiceControllers.deleteAService);

export const ServiceRoutes = router;
