import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/config/middlewares/globalErrorHandler';
import notFound from './app/config/middlewares/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';
const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use('/api', router);
// app.use('/api/my-bookings', myRoutes);

app.use(globalErrorHandler);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Bangladesh of the World!');
});

app.use(notFound);

export default app;
