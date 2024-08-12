import { Response } from 'express';

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data?: T;
  metadata?: Record<string, unknown>;
  error?: string | null;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  const {
    statusCode,
    success,
    message,
    data: responseData,
    metadata,
    error,
  } = data;

  // Adjust the message and success if data is empty
  const finalSuccess =
    Array.isArray(responseData) && responseData.length === 0 ? false : success;
  const finalMessage =
    Array.isArray(responseData) && responseData.length === 0
      ? 'No Data Found'
      : message;

  const responsePayload: Record<string, unknown> = {
    success: finalSuccess,
    statusCode,
    message: finalMessage,
    data: responseData || null,
  };

  if (metadata) {
    responsePayload.metadata = metadata;
  }

  if (error) {
    responsePayload.error = error;
  }

  res.status(statusCode).json(responsePayload);
};

export default sendResponse;
