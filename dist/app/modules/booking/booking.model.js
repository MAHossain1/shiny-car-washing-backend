"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    customerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    serviceId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Service',
    },
    slotId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Slot',
    },
    vehicleType: {
        type: String,
        required: true,
    },
    vehicleModel: {
        type: String,
        required: true,
    },
    vehicleBrand: {
        type: String,
        required: true,
    },
    manufacturingYear: {
        type: Number,
        required: true,
    },
    registrationPlate: {
        type: String,
        required: true,
    },
    transactionId: {
        type: String,
        required: true,
    },
    paymentStatus: { type: String },
    paymentConfirmationDate: { type: String },
}, {
    timestamps: true,
});
exports.Booking = (0, mongoose_1.model)('Booking', bookingSchema);
