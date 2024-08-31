import express from 'express';
import auth from '../../config/middlewares/auth';
import validateRequest from '../../config/middlewares/validateRequest';
import { ReviewZodValidationSchema } from './review.validation';
import { ReviewControllers } from './review.controller';

const router = express.Router();

router.post(
  '/',
  auth('user'),
  validateRequest(ReviewZodValidationSchema.createReviewValidation),
  ReviewControllers.createAReview
);

// router.get('/', auth('admin'), BookingControllers.getAllBookings);

export const ReviewRoutes = router;
