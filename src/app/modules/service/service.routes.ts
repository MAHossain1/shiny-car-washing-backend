import express from 'express';
import auth from '../../config/middlewares/auth';
import validateRequest from '../../config/middlewares/validateRequest';
import { ServiceValidationZodSchema } from './service.validation';
import { ServiceControllers } from './service.controller';

const router = express.Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(ServiceValidationZodSchema.createServiceValidationSchema),
  ServiceControllers.createService
);

router.get('/:id', ServiceControllers.getAService);

router.get('/', ServiceControllers.getAllServices);

router.patch(
  '/:id',
  auth('admin'),
  validateRequest(ServiceValidationZodSchema.updateServiceValidationSchema),
  ServiceControllers.updateAService
);

router.delete('/:id', auth('admin'), ServiceControllers.deleteAService);

export const ServiceRoutes = router;
