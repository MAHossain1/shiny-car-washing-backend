import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TReview } from './review.interface';
import { Review } from './review.model';

const createAReviewIntoDB = async (userEmail: string, payload: TReview) => {
  const { reviewText, ratting } = payload;

  const user = await User.findOne({ email: userEmail });
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not a valid user.');
  }

  const customerId = user._id;

  const reviewData = {
    customerId,
    reviewText,
    ratting,
  };

  const result = await Review.create(reviewData);

  return result;
};

export const ReviewServices = {
  createAReviewIntoDB,
};
