import Joi from 'joi';

const id = Joi.number().min(0);
const email = Joi.string().email();
const password = Joi.string()
  .min(8)
  .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/);
const rol = Joi.string().valid('admin', 'limit');
const isActive = Joi.boolean();
const limit = Joi.number().min(2);
const offset = Joi.number().min(0);

const getUserSchema = Joi.object({
  id: id.required(),
});

const getUsersFilters = Joi.object({
  limit: limit,
  offset: offset,
  isActive: isActive,
  rol: rol,
});

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  rol: rol,
  isActive: isActive,
});

export { getUserSchema, getUsersFilters, createUserSchema };
