import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { userSearchFields } from './user.constant';
import { TUser } from './user.interface';
import { User } from './user.model';

const getAllUsers = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query)
    .search(userSearchFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await userQuery.modelQuery;
  return result;
};

const getSingleUserFromDB = async (email: string) => {
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new AppError(400, 'User not found');
  }

  return user;
};

const updateAUserIntoDB = async (email: string, payload: Partial<TUser>) => {
  const result = await User.findOneAndUpdate({ email: email }, payload, {
    new: true,
  });

  return result;
};

export const UserServices = {
  getAllUsers,
  updateAUserIntoDB,
  getSingleUserFromDB,
};
