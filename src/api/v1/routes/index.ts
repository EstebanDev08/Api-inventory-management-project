import express, { Express } from 'express';
import { userRouter } from './user.routes';
import { customerRouter } from './customer.routes';

const versionApi = '/api/v1';

const routerApi = (app: Express) => {
  const router = express.Router();
  app.use(versionApi, router);

  //rutas

  router.use('/user', userRouter);
  router.use('/customer', customerRouter);
};

export { routerApi };
