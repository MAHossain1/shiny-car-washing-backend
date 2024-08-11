import { Date, Types } from 'mongoose';

export type TSlot = {
  service: Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
};
