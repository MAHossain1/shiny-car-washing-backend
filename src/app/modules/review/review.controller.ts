import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { ReviewServices } from './review.service';

const createAReview = catchAsync(async (req: Request, res: Response) => {
  const { userEmail } = req.user!;
  const result = await ReviewServices.createAReviewIntoDB(userEmail, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Create a Review successfully done.',
    data: result,
  });
});

const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewServices.getAllReviews();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Retrieved all Reviews successfully done.',
    data: result,
  });
});

export const ReviewControllers = {
  createAReview,
  getAllReviews,
};
