import jwt from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { email: string; name: string; role: string },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn });
};
