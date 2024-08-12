import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TBooking } from './booking.interface';
import { Slot } from '../slot/slot.model';
import { Booking } from './booking.model';

const createABookingIntoDB = async (userEmail: string, payload: TBooking) => {
  const {
    slotId,
    serviceId,
    vehicleType,
    vehicleModel,
    vehicleBrand,
    manufacturingYear,
    registrationPlate,
  } = payload;

  const user = await User.findOne({ email: userEmail });
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not a valid user.');
  }

  const customerId = user._id;

  const existingBooking = await Booking.findOne({
    serviceId,
    slotId,
    customerId,
  });

  if (existingBooking) {
    throw new AppError(
      httpStatus.CONFLICT,
      'A booking with the same slot and service already exists!'
    );
  }

  const isServiceExistsInSlot = await Slot.findOne({
    _id: payload.slotId,
    service: payload.serviceId,
  });
  if (!isServiceExistsInSlot) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This slot is not found in this service.'
    );
  }

  await Slot.findByIdAndUpdate(payload.slotId, { isBooked: 'booked' });

  const bookingData = {
    customerId,
    slotId,
    serviceId,
    vehicleType,
    vehicleModel,
    vehicleBrand,
    manufacturingYear,
    registrationPlate,
  };

  const booking = await Booking.create(bookingData);

  const populatedBooking = await Booking.findById(booking._id)
    .populate('customerId')
    .populate('serviceId')
    .populate('slotId');
  return populatedBooking;
};

export const BookingServices = {
  createABookingIntoDB,
};
