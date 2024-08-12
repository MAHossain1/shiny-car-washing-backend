"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidationSchema = void 0;
const zod_1 = require("zod");
// const userNameValidationSchema = z.object({
//   firstName: z
//     .string()
//     .max(20, 'First name can not be more than 20 characters.')
//     .min(1),
//   middleName: z.string().optional(),
//   lastName: z
//     .string()
//     .max(20, 'First name can not be more than 20 characters.')
//     .min(1),
// });
const createUserZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required'),
        email: zod_1.z.string().email('Email is not valid').min(1, 'Email is required'),
        password: zod_1.z
            .string()
            .min(1, 'password is required')
            .max(20, 'password should not exceeded 20 character.'),
        phone: zod_1.z.string().min(1, 'Phone number is required'),
        role: zod_1.z.enum(['admin', 'user']),
        address: zod_1.z.string().min(1, 'Address is required'),
    }),
});
exports.UserValidationSchema = {
    createUserZodValidation,
};
