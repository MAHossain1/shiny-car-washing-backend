import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import config from '../../config';

const LoginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.LoginUser(req.body);

  const { refreshToken, accessToken, data } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Successfully Logged in.',
    data: { accessToken, data },
  });
});

export const AuthControllers = {
  LoginUser,
};
