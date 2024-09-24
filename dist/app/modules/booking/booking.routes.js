"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myRoutes = exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../config/middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../config/middlewares/validateRequest"));
const booking_validation_1 = require("./booking.validation");
const booking_controller_1 = require("./booking.controller");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)('user'), (0, validateRequest_1.default)(booking_validation_1.BookingZodValidationSchema.createBookingValidation), booking_controller_1.BookingControllers.createABooking);
router.get('/', (0, auth_1.default)('admin'), booking_controller_1.BookingControllers.getAllBookings);
exports.BookingRoutes = router;
exports.myRoutes = router.get('/my-bookings', (0, auth_1.default)('user'), booking_controller_1.BookingControllers.getUserBookings);
