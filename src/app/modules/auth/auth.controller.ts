import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const LoginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.LoginUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Successfully Logged in.',
    data: result,
  });
});

export const AuthControllers = {
  LoginUser,
};
