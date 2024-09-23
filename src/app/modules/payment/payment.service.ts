/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { readFileSync } from 'fs';
import { join } from 'path';

import { Booking } from '../booking/booking.model';
import { verifyPayment } from './payment.utlis';

// eslint-disable-next-line no-unused-vars
const confirmPayment = async (transactionId: string, status: string) => {
  const verifiedResponse = await verifyPayment(transactionId);

  let result, message;

  if (verifiedResponse && verifiedResponse.pay_status === 'Successful') {
    result = await Booking.findOneAndUpdate(
      { transactionId },
      {
        paymentStatus: 'Paid',
        paymentConfirmationDate: new Date(),
      }
    );

    message =
      'Successfully Paid!<br>Thank you for your payment. You will receive a confirmation email shortly. Please check your inbox for the details.';
  } else {
    message =
      'Payment Failed!<br>Unfortunately, your payment was not successful. Please try again or contact support if the issue persists.';
  }

  const filePath = join(__dirname, '../../views/confirmation.html');
  let template = readFileSync(filePath, 'utf8');

  template = template.replace('{{message}}', message);

  return template;
};

export const PaymentServices = {
  confirmPayment,
};
