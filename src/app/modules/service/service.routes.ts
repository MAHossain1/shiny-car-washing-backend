import express from 'express';
import auth from '../../config/middlewares/auth';
import validateRequest from '../../config/middlewares/validateRequest';
import { ServiceValidationZodSchema } from './service.validation';

const router = express.Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(ServiceValidationZodSchema.createServiceValidationSchema)
);

export const ServiceRoutes = router;
