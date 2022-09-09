import { pinoHttp } from 'pino-http';
import { LOG_LEVEL, isProduction } from '../configuration/index.js';

const httpLogger = pinoHttp({
  level: 'debug',
});
const logger = httpLogger.logger;

export { httpLogger, logger };
