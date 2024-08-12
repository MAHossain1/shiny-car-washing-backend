"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingZodValidationSchema = void 0;
const zod_1 = require("zod");
const createBookingValidation = zod_1.z.object({
    body: zod_1.z.object({
        serviceId: zod_1.z.string({ required_error: 'serviceId is required' }),
        slotId: zod_1.z.string({ required_error: 'slot is required' }),
        vehicleType: zod_1.z.string({ required_error: 'vehicleType is required' }),
        vehicleBrand: zod_1.z.string({ required_error: 'vehicleBrand is required' }),
        vehicleModel: zod_1.z.string({ required_error: 'vehicleModel is required' }),
        manufacturingYear: zod_1.z.number({
            required_error: 'manufacturingYear is required.',
        }),
        registrationPlate: zod_1.z.string({
            required_error: 'registrationPlate is required.',
        }),
    }),
});
exports.BookingZodValidationSchema = {
    createBookingValidation,
};
