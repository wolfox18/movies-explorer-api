import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import bcryptjs from 'bcryptjs';
import { UnauthorizedError } from '../utils/errors.js';

const userSchema = new Schema({
  name: {
    type: String,
    default: 'Жарь-Лук де Блюю',
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: () => 'Введите корректный email',
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
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      return bcryptjs.compare(password, document.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные почта или пароль');
          }
          const user = document.toObject();
          delete user.password;
          return user;
        });
    });
};

export const User = mongoose.model('users', userSchema);
