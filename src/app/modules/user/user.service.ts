import QueryBuilder from '../../builder/QueryBuilder';
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

const updateAUserIntoDB = async (UserId: string, payload: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate(UserId, payload, {
    new: true,
  });

  return result;
};

export const UserServices = { getAllUsers, updateAUserIntoDB };
