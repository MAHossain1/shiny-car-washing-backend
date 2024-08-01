import QueryBuilder from '../../builder/QueryBuilder';
import { userSearchFields } from './user.constant';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUser = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

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

export const UserServices = { createUser, getAllUsers };
