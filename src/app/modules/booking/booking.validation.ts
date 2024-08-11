import { z } from 'zod';

const createBookingValidation = z.object({
  body: z.object({
    serviceId: z.string({ required_error: 'serviceId is required' }),
    slot: z.string({ required_error: 'slot is required' }),
    vehicleType: z.string({ required_error: 'vehicleType is required' }),
    vehicleBrand: z.string({ required_error: 'vehicleBrand is required' }),
    vehicleModel: z.string({ required_error: 'vehicleModel is required' }),
    manufacturingYear: z.string({
      required_error: 'manufacturingYear is required.',
    }),
    registrationPlate: z.string({
      required_error: 'registrationPlate is required.',
    }),
  }),
});

export const BookingZodValidationSchema = {
  createBookingValidation,
};
