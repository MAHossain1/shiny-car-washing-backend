import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/config/middlewares/globalErrorHandler';
import notFound from './app/config/middlewares/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      'https://shiny-car-washing-service.netlify.app',
      // 'https://shiny-car-washing-client.vercel.app/',
      'http://localhost:5173',
    ], // Note no trailing slash}
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
);

app.use('/api', router);

app.use(globalErrorHandler);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World from Bangladesh 2.0');
});

app.use(notFound);

export default app;
