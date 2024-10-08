import { Types } from 'mongoose';

export type TBooking = {
  customerId: Types.ObjectId;
  serviceId: Types.ObjectId;
  slotId: Types.ObjectId;
  vehicleType: string;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
  // payment_url?: string;
  transactionId: string;
  paymentStatus: string;
  paymentConfirmationDate: string;
};
