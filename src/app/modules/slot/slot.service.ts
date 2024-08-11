import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Service } from '../service/service.model';
import { TSlot } from './slot.interface';
import { formatMinutesToTime, parseTimeToMinutes } from './slot.utils';
import { Slot } from './slot.model';
import { BookedOption } from './slot.constant';

const createSlotsIntoDB = async (payload: TSlot) => {
  const { service, date, startTime, endTime } = payload;

  // check if service exists or not
  const isServiceExists = await Service.findById(service);
  if (!isServiceExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found.');
  }

  const startMinutes = parseTimeToMinutes(startTime);
  const endMinutes = parseTimeToMinutes(endTime);
  const slotDuration = 60;

  const numberOfSlots = (endMinutes - startMinutes) / slotDuration;

  const createdSlot: TSlot[] = [];

  let currentStartTime = startMinutes;

  for (let i = 0; i < numberOfSlots; i++) {
    const slotStartTime = formatMinutesToTime(currentStartTime);
    const slotEndTime = formatMinutesToTime(currentStartTime + slotDuration);

    // Check if the slot already exists
    const existingSlot = await Slot.findOne({
      service,
      date,
      startTime: slotStartTime,
      endTime: slotEndTime,
    });

    if (existingSlot) {
      throw new AppError(httpStatus.CONFLICT, 'Slot already exists.');
    }

    const slot = {
      service,
      date,
      startTime: slotStartTime,
      endTime: slotEndTime,
      isBooked: BookedOption.available,
    };

    createdSlot.push(slot);

    currentStartTime = currentStartTime + slotDuration;
  }

  const result = await Slot.create(createdSlot);
  return result;
};

export const SlotServices = {
  createSlotsIntoDB,
};
