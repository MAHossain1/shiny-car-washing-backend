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

const updateASlot = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SlotServices.updateASlotIntoDB(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Update a Slot successfully done.',
    data: result,
  });
});

const deleteASlot = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SlotServices.deleteASlotFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Delete a Slot successfully done.',
    data: result,
  });
});

export const SlotControllers = {
  createSlots,
  getAvailableSlots,
  updateASlot,
  deleteASlot,
};
