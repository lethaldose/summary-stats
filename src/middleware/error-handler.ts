import { NextFunction, Request, Response } from 'express';
import HttpException from '../errors/http-exception.js';

function errorHandlerMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
  if (!error) {
    return next(error);
  }

  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  response.status(status).send({
    message,
    status,
  });
}

export default errorHandlerMiddleware;
