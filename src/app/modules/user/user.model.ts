import { model, Schema } from 'mongoose';
import { TUser, TUserName } from './user.interface';
import { Roles } from './user.constant';

const userNameSchema = new Schema<TUserName>(
  {
    firstName: {
      type: String,
      required: [true, 'First Name is required'],
      trim: true,
    },
    middleName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'First Name is required'],
      trim: true,
    },
  },
  {
    _id: false,
  }
);

const userSchema = new Schema<TUser>({
  name: {
    type: userNameSchema,
    required: [true, 'User name is required.'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'email is required.'],
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: {
      values: Roles,
      message: `{VALUE} is not a valid role.`,
    },
  },
  address: {
    type: String,
    required: true,
  },
});

export const User = model<TUser>('User', userSchema);
