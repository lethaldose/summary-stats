import { pinoHttp, Options } from 'pino-http';
import { LOG_LEVEL, isProduction } from '../configuration/index.js';

let loggerOptions: Options = {
  level: LOG_LEVEL,
};

if (!isProduction) {
  loggerOptions = {
    ...loggerOptions,
    transport: {
      target: 'pino-pretty',
    },
  };
}
const httpLogger = pinoHttp(loggerOptions);
const logger = httpLogger.logger;

export { httpLogger, logger };
