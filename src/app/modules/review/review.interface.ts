import { Types } from 'mongoose';

export type TReview = {
  customerId: Types.ObjectId;
  reviewText: string;
  ratting: number;
};
