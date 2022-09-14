import { PORT, NODE_ENV, validateConfig } from './configuration/index.js';
import { getApp } from './app.js';
import { logger } from './utils/logger.js';

const startServer = () => {
  try {
    if (!validateConfig()) {
      logger.error('Config values or environment variables are not set. Please check .env files');
      process.exit(1);
    }
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
  logger.error(err);
  throw err;
});

process.on('uncaughtException', (err) => {
  logger.error(err);
  process.exit(1);
});

startServer();
