import { Joi, celebrate } from 'celebrate';

export const celebrateUserCreate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});

export const celebrateUserEdit = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
  }),
});

export const celebrateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});
