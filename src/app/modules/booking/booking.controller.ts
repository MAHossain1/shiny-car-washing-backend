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

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingServices.getAllBookingsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Retrieved all bookings successfully done.',
    data: result,
  });
});

const getUserBookings = catchAsync(async (req: Request, res: Response) => {
  const { userEmail } = req.user!;
  const result = await BookingServices.getUserBookingsFromDB(userEmail);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Retrieved my bookings successfully done.',
    data: result,
  });
});

export const BookingControllers = {
  createABooking,
  getAllBookings,
  getUserBookings,
};
