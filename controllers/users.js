import { constants } from 'http2';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/users.js';
import {
  NotFoundError, BadRequestError, ConflictError,
} from '../utils/errors.js';
import { messages } from '../utils/utils.js';

export const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const { JWT_SALT } = req.app.get('config');
      const token = jwt.sign({ _id: user._id }, JWT_SALT, { expiresIn: '1d' });
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

export const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcryptjs.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    })
      .then((document) => {
        const user = document.toObject();
        delete user.password;
        res.status(constants.HTTP_STATUS_CREATED).send(user);
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new BadRequestError(messages.invalidDataMessage));
        } else if (err.code === 11000) {
          next(new ConflictError(messages.userWithSameEmailMessage));
        } else {
          next(err);
        }
      }));
};

export const readMe = (req, res, next) => {
  User.findById({ _id: req.user._id })
    .then((user) => {
      if (user) res.send(user);
      else {
        next(new NotFoundError(messages.userUnfoundMessage));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(messages.invalidDataMessage));
      }
      next(err);
    });
};

export const editMe = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user) res.send(user);
      else {
        next(new NotFoundError(messages.userUnfoundMessage));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(messages.invalidDataMessage));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(messages.invalidDataMessage));
      } else if (err.code === 11000) {
        next(new ConflictError(messages.userWithSameEmailMessage));
      } else {
        next(err);
      }
    });
};
