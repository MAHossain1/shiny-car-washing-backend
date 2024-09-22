import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';
import config from '../../config';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { TUser } from '../user/user.interface';

const createUser = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

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
    email: user.email,
    name: user.name,
    role: user.role ?? 'user',
  };

  // create  accessToken
  const token = createToken(
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
    token,
    refreshToken,
    data: user,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  //   console.log(userData);
  const user = await User.isUserExistsByEmail(userData.email);
  //   console.log('user from controller', user);

  // Whether the user exists or not.
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  //checking if the password is correct
  if (!(await User.isPasswordMatch(payload.oldPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  // hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcyrpt_salt_rounds)
  );

  const result = await User.findOneAndUpdate(
    {
      email: userData.email,
      role: userData.role,
    },
    {
      password: newHashedPassword,
    }
  );

  return result;
};

export const AuthServices = {
  createUser,
  LoginUser,
  changePassword,
};
