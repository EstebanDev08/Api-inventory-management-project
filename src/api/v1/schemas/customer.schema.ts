import Joi from 'joi';

const id = Joi.number().min(0);
const name = Joi.string().min(1);
const lastName = Joi.string().min(1);
const cellPhoneNumber = Joi.number().integer();
const country = Joi.string().min(1);
const avatar = Joi.string().uri();
const userId = Joi.number().integer().positive();
const limit = Joi.number().min(2);
const offset = Joi.number().min(0);

const getCustomerSchema = Joi.object({
  id: id.required(),
});

const getCustomersFilters = Joi.object({
  limit: limit,
  offset: offset,
  country: country,
});

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  cellPhoneNumber: cellPhoneNumber,
  country: country.required(),
  avatar: avatar,
  userId: userId.required(),
});

const updateCustomerSchema = Joi.object({
  name: name,
  lastName: lastName,
  cellPhoneNumber: cellPhoneNumber,
  country: country,
  avatar: avatar,
});

export {
  getCustomerSchema,
  getCustomersFilters,
  createCustomerSchema,
  updateCustomerSchema,
};
