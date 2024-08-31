import { model, Schema, ObjectId, Document } from 'mongoose';

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

interface TBooking extends Document {
  customerId: ObjectId;
  serviceId: ObjectId;
  slotId: ObjectId;
  vehicleType: string;
  vehicleModel: string;
  vehicleBrand: string;
  manufacturingYear: number;
  registrationPlate: string;
  payment_url?: string;
  createdAt?: Date; // Add this line
  updatedAt?: Date; // Add this line
}

export const Booking = model<TBooking>('Booking', bookingSchema);
