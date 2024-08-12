import express from 'express';
import auth from '../../config/middlewares/auth';
import validateRequest from '../../config/middlewares/validateRequest';
import { BookingZodValidationSchema } from './booking.validation';
import { BookingControllers } from './booking.controller';

const router = express.Router();

router.post(
  '/',
  auth('user'),
  validateRequest(BookingZodValidationSchema.createBookingValidation),
  BookingControllers.createABooking
);

router.get('/', auth('admin'), BookingControllers.getAllBookings);

export const BookingRoutes = router;

export const myRoutes = router.get(
  '/',
  auth('user'),
  BookingControllers.getUserBookings
);
