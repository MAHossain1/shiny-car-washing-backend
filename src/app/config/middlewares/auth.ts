import { NextFunction, Request, Response } from 'express';
import { TUserRole } from '../../modules/user/user.interface';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '..';
import { User } from '../../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route!'
      );
    }

    const [bearer, token] = authorizationHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route!'
      );
    }

    let decoded;

    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_token as string
      ) as JwtPayload;
    } catch (error) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized');
    }

    const { userEmail, role } = decoded;
    // console.log(userEmail, role, iat);

    const user = await User.isUserExistsByEmail(userEmail);

    // Whether the user exists or not.
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have  no access to this route!'
      );
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
