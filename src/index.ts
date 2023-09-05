import express, { Request, Response } from 'express';
import { routerApi } from './api/v1/routes';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World');
});

app.use(express.json()); // Para analizar JSON en el cuerpo

routerApi(app);

const port = Number(process.env.PORT ?? 3000);
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});
