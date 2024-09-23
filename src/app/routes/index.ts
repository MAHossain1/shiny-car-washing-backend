import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { MyRoutes } from '../modules/booking/booking.route';
import { BookingRoutes } from '../modules/booking/booking.routes';
import { ServiceRoutes } from '../modules/service/service.routes';
import { SlotRoutes } from '../modules/slot/slot.routes';
import { UserRoutes } from '../modules/user/user.routes';
import { ReviewRoutes } from '../modules/review/review.routes';
import { PaymentRoutes } from '../modules/payment/payment.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/services',
    route: ServiceRoutes,
  },
  {
    path: '/slots',
    route: SlotRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
  {
    path: '/my-bookings',
    route: MyRoutes,
  },
  {
    path: '/review',
    route: ReviewRoutes,
  },
  {
    path: '/payment',
    route: PaymentRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
