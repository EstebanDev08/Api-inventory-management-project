import express, { Request, Response } from 'express';
import { routerApi } from './api/v1/routes';
import {
  boomErrorHandler,
  errorHandler,
  logErrors,
  ormErrorHandler,
} from './api/v1/middlewares/errorHandler';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World');
});

app.use(express.json()); // Para analizar JSON en el cuerpo

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
