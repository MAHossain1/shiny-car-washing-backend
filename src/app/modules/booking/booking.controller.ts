import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { BookingServices } from './booking.service';

const createABooking = catchAsync(async (req: Request, res: Response) => {
  const { userEmail } = req.user!;
  const result = await BookingServices.createABookingIntoDB(
    userEmail,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Create a booking successfully done.',
    data: result,
  });
});

export const BookingControllers = {
  createABooking,
};
