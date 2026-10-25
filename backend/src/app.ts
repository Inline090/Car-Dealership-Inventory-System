import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { env } from './config/env';
import { healthRouter } from './modules/health/health.routes';
import { errorHandler } from './shared/middleware/error-handler';
import { notFound } from './shared/middleware/not-found';

export const createApp = () => {
  const app = express();

  app.disable('x-powered-by');
  app.use(helmet());
  app.use(cors({ origin: env.corsOrigin }));
  app.use(express.json({ limit: '1mb' }));

  app.use('/api/health', healthRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};

export const app = createApp();
