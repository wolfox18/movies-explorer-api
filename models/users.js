import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import bcryptjs from 'bcryptjs';
import { UnauthorizedError } from '../utils/errors.js';
import { messages } from '../utils/utils.js';

const userSchema = new Schema({
  name: {
    type: String,
    default: 'Жарь-Лук де Блюю',
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: () => messages.enterValidEmailMessage,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((document) => {
      if (!document) {
        throw new UnauthorizedError(messages.uncorrectCredentialsMessage);
      }
      return bcryptjs.compare(password, document.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(messages.uncorrectCredentialsMessage);
          }
          const user = document.toObject();
          delete user.password;
          return user;
        });
    });
};

export const User = mongoose.model('users', userSchema);
