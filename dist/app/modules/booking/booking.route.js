"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../config/middlewares/auth"));
const booking_controller_1 = require("./booking.controller");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)('user'), booking_controller_1.BookingControllers.getUserBookings);
exports.MyRoutes = router;
