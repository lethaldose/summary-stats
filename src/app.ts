import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { httpLogger } from './utils/logger.js';
import { employeeRouter } from './employee/employee-controller.js';
import { statsSummaryRouter } from './summary/summary-controller.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

export const getApp = () => {
  const app: Express = express();
  app.use(helmet());
  app.use(cors());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(httpLogger);

  app.get('/api/v1/health-check', (_: Request, res: Response) => {
    res.json({ ok: true });
  });

  app.use('/api/v1/employees', employeeRouter);
  app.use('/api/v1/stats-summary', statsSummaryRouter);
  app.use(errorHandlerMiddleware);

  return app;
};
