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
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const slot_model_1 = require("../slot/slot.model");
const booking_model_1 = require("./booking.model");
const mongoose_1 = __importDefault(require("mongoose"));
const service_model_1 = require("../service/service.model");
const payment_utlis_1 = require("../payment/payment.utlis");
// const createABookingIntoDB = async (email: string, payload: TBooking) => {
//   const {
//     slotId,
//     serviceId,
//     vehicleType,
//     vehicleModel,
//     vehicleBrand,
//     manufacturingYear,
//     registrationPlate,
//   } = payload;
//   const user = await User.findOne({ email: email });
//   if (!user) {
//     throw new AppError(httpStatus.UNAUTHORIZED, 'You are not a valid user.');
//   }
//   const customerId = user._id;
//   const existingBooking = await Booking.findOne({
//     serviceId,
//     slotId,
//     customerId,
//   });
//   if (existingBooking) {
//     throw new AppError(
//       httpStatus.CONFLICT,
//       'A booking with the same slot and service already exists!'
//     );
//   }
//   const isServiceExistsInSlot = await Slot.findOne({
//     _id: payload.slotId,
//     service: payload.serviceId,
//   });
//   if (!isServiceExistsInSlot) {
//     throw new AppError(
//       httpStatus.NOT_FOUND,
//       'This slot is not found in this service.'
//     );
//   }
//   await Slot.findByIdAndUpdate(payload.slotId, { isBooked: 'booked' });
//   const bookingData = {
//     customerId,
//     slotId,
//     serviceId,
//     vehicleType,
//     vehicleModel,
//     vehicleBrand,
//     manufacturingYear,
//     registrationPlate,
//   };
//   const createdBooking = await Booking.create(bookingData);
//   const booking = await Booking.findById(createdBooking._id)
//     .populate('customerId')
//     .populate('serviceId')
//     .populate('slotId');
//   const result = {
//     _id: booking?._id,
//     customer: booking?.customerId,
//     service: booking?.serviceId,
//     slot: booking?.slotId,
//     vehicleType: booking?.vehicleType,
//     vehicleBrand: booking?.vehicleBrand,
//     vehicleModel: booking?.vehicleModel,
//     manufacturingYear: booking?.manufacturingYear,
//     registrationPlate: booking?.registrationPlate,
//     createdAt: booking?.createdAt,
//     updatedAt: booking?.updatedAt,
//   };
//   return result;
// };
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
    const service = yield service_model_1.Service.findById(serviceId);
    if (!service) {
        throw new AppError_1.default(400, 'Service not found: ' + serviceId);
    }
    const slot = yield slot_model_1.Slot.findById(slotId);
    if (!slot) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'slot not found!');
    }
    //! Update slot after successfully completion payment using transaction and rollback
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        slot.isBooked = 'booked';
        yield slot.save();
        const transactionId = `TXN-${Date.now()}`;
        const bookingData = {
            customerId,
            slotId,
            serviceId,
            vehicleType,
            vehicleModel,
            vehicleBrand,
            manufacturingYear,
            registrationPlate,
            transactionId,
        };
        yield booking_model_1.Booking.create(bookingData);
        const paymentData = {
            transactionId,
            price: service.price,
            customerName: user.name,
            customerEmail: user.email,
            customerPhone: user.phone,
            customerAddress: user.address,
            startTime: slot.startTime,
            serviceName: service.name,
        };
        const paymentSession = yield (0, payment_utlis_1.initiatePayment)(paymentData);
        yield session.commitTransaction();
        yield session.endSession();
        return paymentSession;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error);
    }
    // await Slot.findByIdAndUpdate(payload.slotId, { isBooked: 'booked' });
    // const bookingData = {
    //   customerId,
    //   slotId,
    //   serviceId,
    //   vehicleType,
    //   vehicleModel,
    //   vehicleBrand,
    //   manufacturingYear,
    //   registrationPlate,
    // };
    // const createdBooking = await Booking.create(bookingData);
    // const booking = await Booking.findById(createdBooking._id)
    //   .populate('customerId')
    //   .populate('serviceId')
    //   .populate('slotId');
    // const result = {
    //   _id: booking?._id,
    //   customer: booking?.customerId,
    //   service: booking?.serviceId,
    //   slot: booking?.slotId,
    //   vehicleType: booking?.vehicleType,
    //   vehicleBrand: booking?.vehicleBrand,
    //   vehicleModel: booking?.vehicleModel,
    //   manufacturingYear: booking?.manufacturingYear,
    //   registrationPlate: booking?.registrationPlate,
    //   createdAt: booking?.createdAt,
    //   updatedAt: booking?.updatedAt,
    // };
    // return result;
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
