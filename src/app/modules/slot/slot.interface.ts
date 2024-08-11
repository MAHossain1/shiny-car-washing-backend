import { Date, Types } from 'mongoose';
import { BookedOption } from './slot.constant';

export type TSlot = {
  service: Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  isBooked: keyof typeof BookedOption;
};
