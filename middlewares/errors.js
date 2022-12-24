import { constants } from 'http2';
import { messages } from '../utils/utils.js';

export const errorsHandler = (err, req, res, next) => {
  if (err.statusCode) res.status(err.statusCode).send({ message: err.message });
  else {
    res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .send({ message: messages.unknownErrorMessage });
  }
  next();
};
