import express from 'express';
import auth from '../../config/middlewares/auth';
import { BookingControllers } from './booking.controller';

const router = express.Router();

router.get('/', auth('user'), BookingControllers.getUserBookings);

export const MyRoutes = router;
