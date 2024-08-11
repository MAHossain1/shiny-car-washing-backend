import { model, Schema } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    slotId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    vehicleType: {
      type: String,
      required: true,
    },
    vehicleModel: {
      type: String,
      required: true,
    },
    vehicleBrand: {
      type: String,
      required: true,
    },
    manufacturingYear: {
      type: String,
      required: true,
    },
    registrationPlate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Booking = model<TBooking>('Booking', bookingSchema);
