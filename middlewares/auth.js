import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/errors.js';
import { messages } from '../utils/utils.js';

export const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(messages.authorizationNeededMessage));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  const { JWT_SALT } = req.app.get('config');

  try {
    payload = jwt.verify(token, JWT_SALT);
    req.user = payload;
    next();
  } catch (err) {
    next(new UnauthorizedError(messages.authorizationNeededMessage));
    next();
  }
};
