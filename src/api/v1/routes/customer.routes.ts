import { Router } from 'express';
import { validatorHandler } from '../middlewares/validatorHandler';
import {
  createCustomerSchema,
  getCustomerSchema,
  getCustomersFilters,
  updateCustomerSchema,
} from '../schemas/customer.schema';
import { CustomerController } from '../controllers/customer.controller';

const customerRouter = Router();

customerRouter.get(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  CustomerController.getOneCustomer
);

customerRouter.get(
  '/',
  validatorHandler(getCustomersFilters, 'query'),
  CustomerController.getAllCustomer
);

customerRouter.post(
  '/',
  validatorHandler(createCustomerSchema, 'body'),
  CustomerController.createCustomer
);

customerRouter.patch(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  CustomerController.updateCustomer
);

customerRouter.delete(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  CustomerController.deleteCustomer
);

export { customerRouter };
