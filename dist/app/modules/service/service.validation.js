"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceValidationZodSchema = void 0;
const zod_1 = require("zod");
const createServiceValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({ required_error: 'Name is required.' })
            .min(3, 'Name must be at least 3 characters long.')
            .max(50, 'Name cannot exceed 50 characters.'),
        description: zod_1.z
            .string({ required_error: 'Description is required.' })
            .min(10, 'Description must be at least 10 characters long.')
            .max(500, 'Description cannot exceed 500 characters.'),
        price: zod_1.z
            .number({
            required_error: 'Price is required.',
            invalid_type_error: 'Price must be a valid number.',
        })
            .positive('Price must be a positive number.')
            .max(10000, 'Price cannot exceed $10,000.'),
        duration: zod_1.z
            .number({
            required_error: 'Duration is required.',
            invalid_type_error: 'Duration must be a valid number.',
        })
            .positive('Duration must be a positive number.')
            .max(480, 'Duration cannot exceed 480 minutes (8 hours).'),
    }),
});
const updateServiceValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({ required_error: 'Name is required.' })
            .min(3, 'Name must be at least 3 characters long.')
            .max(50, 'Name cannot exceed 50 characters.')
            .optional(),
        description: zod_1.z
            .string({ required_error: 'Description is required.' })
            .min(10, 'Description must be at least 10 characters long.')
            .max(500, 'Description cannot exceed 500 characters.')
            .optional(),
        price: zod_1.z
            .number({
            required_error: 'Price is required.',
            invalid_type_error: 'Price must be a valid number.',
        })
            .positive('Price must be a positive number.')
            .max(10000, 'Price cannot exceed $10,000.')
            .optional(),
        duration: zod_1.z
            .number({
            required_error: 'Duration is required.',
            invalid_type_error: 'Duration must be a valid number.',
        })
            .positive('Duration must be a positive number.')
            .max(480, 'Duration cannot exceed 480 minutes (8 hours).')
            .optional(),
    }),
});
exports.ServiceValidationZodSchema = {
    createServiceValidationSchema,
    updateServiceValidationSchema,
};
