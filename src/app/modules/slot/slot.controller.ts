import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { SlotServices } from './slot.service';

const createSlots = catchAsync(async (req: Request, res: Response) => {
  const result = await SlotServices.createSlotsIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Create slots successfully done.',
    data: result,
  });
});

const getAvailableSlots = catchAsync(async (req: Request, res: Response) => {
  const result = await SlotServices.getAvailableSlotsFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Available slots retrieved successfully done.',
    data: result,
  });
});

export const SlotControllers = {
  createSlots,
  getAvailableSlots,
};
