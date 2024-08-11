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

export const ServiceControllers = {
  createService,
  getAService,
  getAllServices,
};
