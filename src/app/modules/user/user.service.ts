import QueryBuilder from '../../builder/QueryBuilder';
import { userSearchFields } from './user.constant';
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

export const UserServices = { getAllUsers };
