import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import notFound from './app/config/middlewares/notFound';
import globalErrorHandler from './app/config/middlewares/globalErrorHandler';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1', router);

app.use(globalErrorHandler);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Bangladesh of the World!');
});

app.use(notFound);

export default app;
