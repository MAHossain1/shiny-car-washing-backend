import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, 'First name can not be more than 20 characters.')
    .min(1),

  middleName: z.string().optional(),
  lastName: z
    .string()
    .max(20, 'First name can not be more than 20 characters.')
    .min(1),
});

const createUserZodValidation = z.object({
  body: z.object({
    name: userNameValidationSchema,
    email: z.string().email('Email is not valid').min(1, 'Email is required'),
    password: z
      .string()
      .min(1, 'password is required')
      .max(20, 'password should not exceeded 20 character.'),
    phone: z.string().min(1, 'Phone number is required'),
    // role: z.array(z.enum([...Roles] as [string, ...string[]])),
    role: z.enum(['admin', 'user']),
    address: z.string().min(1, 'Address is required'),
  }),
});

export const UserValidationSchema = {
  createUserZodValidation,
};
