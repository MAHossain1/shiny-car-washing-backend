import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TBooking } from './booking.interface';
import { Slot } from '../slot/slot.model';
import { Booking } from './booking.model';

const createABookingIntoDB = async (email: string, payload: TBooking) => {
  const {
    slotId,
    serviceId,
    vehicleType,
    vehicleModel,
    vehicleBrand,
    manufacturingYear,
    registrationPlate,
  } = payload;

  const user = await User.findOne({ email: email });
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

  const paymentUrl = 'http://localhost:5173/payment-success';

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
    payment_url: paymentUrl,
  };

  const createdBooking = await Booking.create(bookingData);

  const booking = await Booking.findById(createdBooking._id)
    .populate('customerId')
    .populate('serviceId')
    .populate('slotId');

  const result = {
    _id: booking?._id,
    customer: booking?.customerId,
    service: booking?.serviceId,
    slot: booking?.slotId,
    vehicleType: booking?.vehicleType,
    vehicleBrand: booking?.vehicleBrand,
    vehicleModel: booking?.vehicleModel,
    manufacturingYear: booking?.manufacturingYear,
    registrationPlate: booking?.registrationPlate,
    createdAt: booking?.createdAt,
    updatedAt: booking?.updatedAt,
    payment_url: booking?.payment_url,
  };
  return result;
};

const getAllBookingsFromDB = async () => {
  const bookings = await Booking.find()
    .populate('customerId')
    .populate('serviceId')
    .populate('slotId');

  return bookings;
};

const getUserBookingsFromDB = async (email: string) => {
  const user = await User.findOne({ email }, { _id: 1 });

  const result = await Booking.find({ customerId: user }, { customerId: 0 })
    .populate('serviceId')
    .populate('slotId');

  return result;
};

export const BookingServices = {
  createABookingIntoDB,
  getAllBookingsFromDB,
  getUserBookingsFromDB,
};
