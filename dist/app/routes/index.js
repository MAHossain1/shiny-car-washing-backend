"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/auth/auth.routes");
const booking_route_1 = require("../modules/booking/booking.route");
const booking_routes_1 = require("../modules/booking/booking.routes");
const service_routes_1 = require("../modules/service/service.routes");
const slot_routes_1 = require("../modules/slot/slot.routes");
const user_routes_1 = require("../modules/user/user.routes");
const review_routes_1 = require("../modules/review/review.routes");
const payment_routes_1 = require("../modules/payment/payment.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: user_routes_1.UserRoutes,
    },
    {
        path: '/auth',
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: '/services',
        route: service_routes_1.ServiceRoutes,
    },
    {
        path: '/slots',
        route: slot_routes_1.SlotRoutes,
    },
    {
        path: '/bookings',
        route: booking_routes_1.BookingRoutes,
    },
    {
        path: '/my-bookings',
        route: booking_route_1.MyRoutes,
    },
    {
        path: '/review',
        route: review_routes_1.ReviewRoutes,
    },
    {
        path: '/payment',
        route: payment_routes_1.PaymentRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
