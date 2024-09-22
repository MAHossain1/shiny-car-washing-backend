import { z } from 'zod';

const createUserZodValidation = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Email is not valid').min(1, 'Email is required'),
    password: z
      .string()
      .min(1, 'password is required')
      .max(20, 'password should not exceeded 20 character.'),
    phone: z.string().min(1, 'Phone number is required'),
    // role: z.enum(['admin', 'user']),
    address: z.string().min(1, 'Address is required'),
  }),
});

export const UserValidationSchema = {
  createUserZodValidation,
};
