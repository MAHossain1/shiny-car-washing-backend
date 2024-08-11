import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { ServiceServices } from './service.service';

const createService = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceServices.createServiceIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Create a service successfully done.',
    data: result,
  });
});

const getAService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ServiceServices.getAServiceFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Retrieved a service successfully done.',
    data: result,
  });
});

const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceServices.getAllServicesFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Retrieved all services successfully done.',
    data: result,
  });
});

const updateAService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ServiceServices.updateAServiceIntoDB(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Update a service successfully done.',
    data: result,
  });
});

const deleteAService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ServiceServices.deleteAServiceFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Delete a service successfully done.',
    data: result,
  });
});

export const ServiceControllers = {
  createService,
  getAService,
  getAllServices,
  updateAService,
  deleteAService,
};
