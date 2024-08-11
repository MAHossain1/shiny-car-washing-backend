import { TService } from './service.interface';
import { Service } from './service.model';

const createServiceIntoDB = async (payload: TService) => {
  const result = await Service.create(payload);

  return result;
};

const getAServiceFromDB = async (serviceId: string) => {
  const result = await Service.findById(serviceId);

  return result;
};

const getAllServicesFromDB = async () => {
  const result = await Service.find();

  return result;
};

const updateAServiceIntoDB = async (
  serviceId: string,
  payload: Partial<TService>
) => {
  const result = await Service.findByIdAndUpdate(serviceId, payload, {
    new: true,
  });

  return result;
};

const deleteAServiceFromDB = async (serviceId: string) => {
  const result = await Service.findByIdAndDelete(serviceId);

  return result;
};

export const ServiceServices = {
  createServiceIntoDB,
  getAServiceFromDB,
  getAllServicesFromDB,
  updateAServiceIntoDB,
  deleteAServiceFromDB,
};
