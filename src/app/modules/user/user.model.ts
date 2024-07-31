/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import { TUser, TUserName } from './user.interface';
import { Roles } from './user.constant';
import bcrypt from 'bcrypt';
import config from '../../config';

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

const userSchema = new Schema<TUser>(
  {
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
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcyrpt_salt_rounds)
  );

  next();
});
// userSchema.post('save', async function (doc, next) {
//   doc.password = '';
//   next();
// });

// Use toJSON or toObject to hide the password field
userSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

// use toObject to hide the password fiel
// userSchema.set('toObject', {
//   transform: function (doc, ret) {
//     delete ret.password;
//     return ret;
//   },
// });

export const User = model<TUser>('User', userSchema);
