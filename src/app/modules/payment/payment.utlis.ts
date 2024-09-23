/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import axios from 'axios';
import config from '../../config';

export const initiatePayment = async (paymentData: any) => {
  const {
    transactionId,
    price,
    customerName,
    customerEmail,
    customerAddress,
    customerPhone,
    serviceName,
    startTime,
  } = paymentData;

  try {
    const response = axios.post(config.payment_url!, {
      store_id: config.store_id,
      signature_key: config.signature_key,
      tran_id: transactionId,
      success_url: `http://localhost:${config.port}/api/payment/confirmation?transactionId=${transactionId}&status=success`,

      fail_url: `http://localhost:${config.port}/api/payment/confirmation?status=fail`,

      cancel_url: 'https://shiny-car-washing-service.netlify.app',
      amount: price,
      currency: 'BDT',
      desc: serviceName + ' is booked at ' + startTime,
      cus_name: customerName,
      cus_email: customerEmail,
      cus_phone: customerPhone,
      cus_add1: customerAddress,
      cus_add2: 'N/A',
      cus_city: 'N/A',
      cus_country: 'N/A',
      cus_postcode: '',
      payment_method: 'online',
      type: 'json',
    });

    return (await response).data;
  } catch (err) {
    throw new AppError(401, 'Payment initiation failed!');
  }
};

export const verifyPayment = async (tnxId: string) => {
  try {
    const response = await axios.get(config.payment_verification_url!, {
      params: {
        store_id: config.store_id,
        signature_key: config.signature_key,
        request_id: tnxId,
        type: 'json',
      },
    });

    return response.data;
  } catch (error) {
    throw new AppError(
      httpStatus.FAILED_DEPENDENCY,
      'Payment initiated failed.'
    );
  }
};
