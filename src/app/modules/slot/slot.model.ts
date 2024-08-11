import { model, Schema } from 'mongoose';
import { TSlot } from './slot.interface';
import { BookedOption } from './slot.constant';

const slotSchema = new Schema<TSlot>(
  {
    service: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'service',
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    isBooked: {
      type: String,
      enum: Object.keys(BookedOption),
    },
  },
  {
    timestamps: true,
  }
);

export const Slot = model<TSlot>('Slot', slotSchema);
