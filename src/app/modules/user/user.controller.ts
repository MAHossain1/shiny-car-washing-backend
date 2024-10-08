import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { UserServices } from './user.service';

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getAllUsers(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users retrieved Successfully done.',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params;
  const result = await UserServices.getSingleUserFromDB(email);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Retrieved a user successfully done.',
    data: result,
  });
});

const updateAUser = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params;
  const result = await UserServices.updateAUserIntoDB(email, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Update a user successfully done.',
    data: result,
  });
});

export const UserControllers = {
  getAllUsers,
  getSingleUser,
  updateAUser,
};
