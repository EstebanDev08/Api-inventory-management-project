import express, { Express } from 'express';
import { userRouter } from './user.routes';
import { customerRouter } from './customer.routes';
import { authRouter } from './auth.routes';

const versionApi = '/api/v1';

const routerApi = (app: Express) => {
  const router = express.Router();
  app.use(versionApi, router);

  //rutas

  router.use('/user', userRouter);
  router.use('/customer', customerRouter);
  router.use('/auth', authRouter);
};

export { routerApi };
