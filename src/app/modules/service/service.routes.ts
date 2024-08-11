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

export const ServiceRoutes = router;
