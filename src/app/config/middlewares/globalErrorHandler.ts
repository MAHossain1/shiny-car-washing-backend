import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import handleZodError from '../../errors/handleZodError';
import { TErrorSources } from '../../interface/error';

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res
  //   next: NextFunction
) => {
  let statusCode = 500;
  let message = 'Something went wrong!!';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong!!',
    },
  ];

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
  });
};

export default globalErrorHandler;
