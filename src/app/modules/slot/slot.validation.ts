import { z } from 'zod';

const timeStringSchema = z.string().refine(
  time => {
    const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
    return regex.test(time);
  },
  {
    message: 'Invalid time format, expected "HH:MM" in 24 hours format',
  }
);

const createSlotValidationSchema = z.object({
  body: z
    .object({
      service: z.string({ required_error: 'service is required' }),
      date: z.string({ required_error: 'Date is required.' }),
      startTime: timeStringSchema,
      endTime: timeStringSchema,
    })
    .refine(
      body => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);

        return end > start;
      },
      {
        message: 'Start time should be before end time!',
      }
    ),
});

export const SlotValidationSchema = {
  createSlotValidationSchema,
};
