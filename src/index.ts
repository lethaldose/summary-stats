import { PORT, NODE_ENV } from './configuration/index.js';
import { getApp } from './app.js';
import { logger } from './utils/logger.js';

const startServer = () => {
  try {
    const app = getApp();
    app.listen(PORT, () => {
      logger.info(`started server on http://localhost:${PORT} in ${NODE_ENV} mode`);
    });
  } catch (error) {
    logger.error('failed to start server');
    logger.error(error);
  }
};

process.on('unhandledRejection', (err) => {
  throw err;
});

process.on('uncaughtException', (err) => {
  logger.error(err);
  process.exit(1);
});

startServer();
