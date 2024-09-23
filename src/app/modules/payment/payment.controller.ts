import { Request, Response } from 'express';
import { PaymentServices } from './payment.service';
import catchAsync from '../../utils/catchAsync';

const confirmation = catchAsync(async (req: Request, res: Response) => {
  const { transactionId, status } = req.query;

  const result = await PaymentServices.confirmPayment(
    transactionId as string,
    status as string
  );

  res.send(result);
});

export const PaymentControllers = {
  confirmation,
};
