import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';
import config from '../../config';

const LoginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByEmail(payload.email);

  // Whether the user exists or not.
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  const isPasswordMatch = await User.isPasswordMatch(
    payload?.password,
    user?.password
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Your password is incorrect!');
  }

  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };

  // create  accessToken
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_expires_in as string
  );

  // generate refresh token
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_token as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    data: user,
  };
};

export const AuthServices = {
  LoginUser,
};
