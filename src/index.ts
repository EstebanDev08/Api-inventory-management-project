import express, { Request, Response } from 'express';
import { routerApi } from './api/v1/routes';
import {
  boomErrorHandler,
  errorHandler,
  logErrors,
  ormErrorHandler,
} from './api/v1/middlewares/errorHandler';
import myPassport from './api/v1/auth';
import session from 'express-session';
import { config } from './framework/config/config';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World');
});

app.use(express.json());

app.use(myPassport.initialize());

app.use(
  session({
    secret: config.cookieKey as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(myPassport.session());

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
