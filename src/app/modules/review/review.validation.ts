import { z } from 'zod';

const createReviewValidation = z.object({
  body: z.object({
    reviewText: z.string({
      required_error: 'Review Text is required.',
    }),
    ratting: z.number({
      required_error: 'Ratting is required.',
    }),
  }),
});

export const ReviewZodValidationSchema = {
  createReviewValidation,
};
