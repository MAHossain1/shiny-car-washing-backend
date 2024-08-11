import { model, Schema } from 'mongoose';
import { TService } from './service.interface';

const serviceSchema = new Schema<TService>(
  {
    name: {
      type: String,
      required: [true, 'Service name is required.'],
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required.'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required.'],
    },
    duration: {
      type: Number,
      required: [true, 'Duration is required'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Service = model<TService>('Service', serviceSchema);
