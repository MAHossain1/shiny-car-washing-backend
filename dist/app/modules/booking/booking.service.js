"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const slot_model_1 = require("../slot/slot.model");
const booking_model_1 = require("./booking.model");
const createABookingIntoDB = (email, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { slotId, serviceId, vehicleType, vehicleModel, vehicleBrand, manufacturingYear, registrationPlate, } = payload;
    const user = yield user_model_1.User.findOne({ email: email });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not a valid user.');
    }
    const customerId = user._id;
    const existingBooking = yield booking_model_1.Booking.findOne({
        serviceId,
        slotId,
        customerId,
    });
    if (existingBooking) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'A booking with the same slot and service already exists!');
    }
    const isServiceExistsInSlot = yield slot_model_1.Slot.findOne({
        _id: payload.slotId,
        service: payload.serviceId,
    });
    if (!isServiceExistsInSlot) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This slot is not found in this service.');
    }
    const paymentUrl = 'http://localhost:5173/payment-success';
    yield slot_model_1.Slot.findByIdAndUpdate(payload.slotId, { isBooked: 'booked' });
    const bookingData = {
        customerId,
        slotId,
        serviceId,
        vehicleType,
        vehicleModel,
        vehicleBrand,
        manufacturingYear,
        registrationPlate,
        payment_url: paymentUrl,
    };
    const createdBooking = yield booking_model_1.Booking.create(bookingData);
    const booking = yield booking_model_1.Booking.findById(createdBooking._id)
        .populate('customerId')
        .populate('serviceId')
        .populate('slotId');
    const result = {
        _id: booking === null || booking === void 0 ? void 0 : booking._id,
        customer: booking === null || booking === void 0 ? void 0 : booking.customerId,
        service: booking === null || booking === void 0 ? void 0 : booking.serviceId,
        slot: booking === null || booking === void 0 ? void 0 : booking.slotId,
        vehicleType: booking === null || booking === void 0 ? void 0 : booking.vehicleType,
        vehicleBrand: booking === null || booking === void 0 ? void 0 : booking.vehicleBrand,
        vehicleModel: booking === null || booking === void 0 ? void 0 : booking.vehicleModel,
        manufacturingYear: booking === null || booking === void 0 ? void 0 : booking.manufacturingYear,
        registrationPlate: booking === null || booking === void 0 ? void 0 : booking.registrationPlate,
        createdAt: booking === null || booking === void 0 ? void 0 : booking.createdAt,
        updatedAt: booking === null || booking === void 0 ? void 0 : booking.updatedAt,
        payment_url: booking === null || booking === void 0 ? void 0 : booking.payment_url,
    };
    return result;
});
const getAllBookingsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield booking_model_1.Booking.find()
        .populate('customerId')
        .populate('serviceId')
        .populate('slotId');
    return bookings;
});
const getUserBookingsFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email }, { _id: 1 });
    const result = yield booking_model_1.Booking.find({ customerId: user }, { customerId: 0 })
        .populate('serviceId')
        .populate('slotId');
    return result;
});
exports.BookingServices = {
    createABookingIntoDB,
    getAllBookingsFromDB,
    getUserBookingsFromDB,
};
