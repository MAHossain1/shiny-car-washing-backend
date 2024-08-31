import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Service } from '../service/service.model';
import { TSlot } from './slot.interface';
import { formatMinutesToTime, parseTimeToMinutes } from './slot.utils';
import { Slot } from './slot.model';
import { BookedOption, slotSearchFields } from './slot.constant';
import QueryBuilder from '../../builder/QueryBuilder';

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

const getAvailableSlotsFromDB = async (query: Record<string, unknown>) => {
  if (query.serviceId) {
    query.service = query.serviceId;
    delete query.serviceId;
  }
  const slotQuery = new QueryBuilder(Slot.find(), query)
    .search(slotSearchFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await slotQuery.modelQuery;
  return result;
};

const updateASlotIntoDB = async (SlotId: string, payload: Partial<TSlot>) => {
  const result = await Slot.findByIdAndUpdate(SlotId, payload, {
    new: true,
  });

  return result;
};

const deleteASlotFromDB = async (slotId: string) => {
  const result = await Slot.findByIdAndDelete(slotId);

  return result;
};

export const SlotServices = {
  createSlotsIntoDB,
  getAvailableSlotsFromDB,
  updateASlotIntoDB,
  deleteASlotFromDB,
};
