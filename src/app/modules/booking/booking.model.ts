import { model, Schema } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Service',
    },
    slotId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Slot',
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
      type: Number,
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
