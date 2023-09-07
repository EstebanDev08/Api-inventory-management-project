import express from 'express';
import { validatorHandler } from '../middlewares/validatorHandler';
import {
  createUserSchema,
  getUserSchema,
  getUsersFilters,
} from '../schemas/user.shema';
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  UserController.getUser
);

userRouter.get(
  '/',
  validatorHandler(getUsersFilters, 'query'),
  UserController.getUsers
);

userRouter.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  UserController.createUser
);

export { userRouter };
