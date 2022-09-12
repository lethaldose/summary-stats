import { NextFunction, Request, Response } from 'express';
import { ValidationError, ValidationErrorItem, ObjectSchema } from 'joi';
import HttpException from '../errors/http-exception.js';
import { logger } from '../utils/logger.js';

interface AccessRequest {
  query: keyof Request;
  body: keyof Request;
  params: keyof Request;
}

export const ValidationProp: AccessRequest = {
  query: 'query',
  body: 'body',
  params: 'params',
};

function ValidateSchema(schema: ObjectSchema, validationProp = ValidationProp.body) {
  return async function (request: Request, response: Response, next: NextFunction) {
    try {
      await schema.validateAsync(request[validationProp], { abortEarly: false });
      next();
    } catch (err) {
      logger.error(err, 'ValidateSchema error');

      const validationError = err as ValidationError;
      if (validationError.isJoi) {
        const validationErrorJSON = validationError.details.map((e: ValidationErrorItem) => ({
          path: e.path,
          message: e.message,
        }));
        return response.status(400).json(validationErrorJSON);
      }

      next(new HttpException(500, 'schema validation failed'));
    }
  };
}

export default ValidateSchema;
