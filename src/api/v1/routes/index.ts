import express, { Express } from 'express';

const versionApi = '/api/v1';

const routerApi = (app: Express) => {
  const router = express.Router();
  app.use(versionApi, router);

  //rutas
};

export { routerApi };
