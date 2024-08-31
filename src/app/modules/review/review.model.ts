import { model, Schema } from 'mongoose';
import { TReview } from './review.interface';

const reviewSchema = new Schema<TReview>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    reviewText: {
      type: String,
      required: true,
    },
    ratting: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Review = model<TReview>('Review', reviewSchema);
