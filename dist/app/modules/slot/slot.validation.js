"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotValidationSchema = void 0;
const zod_1 = require("zod");
const slot_constant_1 = require("./slot.constant");
const timeStringSchema = zod_1.z.string().refine(time => {
    const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
    return regex.test(time);
}, {
    message: 'Invalid time format, expected "HH:MM" in 24 hours format',
});
const createSlotValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        service: zod_1.z.string({ required_error: 'service is required' }),
        date: zod_1.z.string({ required_error: 'Date is required.' }),
        isBooked: zod_1.z.nativeEnum(slot_constant_1.BookedOption).default(slot_constant_1.BookedOption.available),
        startTime: timeStringSchema,
        endTime: timeStringSchema,
    })
        .refine(body => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return end > start;
    }, {
        message: 'Start time should be before end time!',
    }),
});
exports.SlotValidationSchema = {
    createSlotValidationSchema,
};
