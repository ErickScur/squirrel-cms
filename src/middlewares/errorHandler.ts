import { NextFunction, Request, Response } from 'express';
import { HttpError } from '@http/HTTPHandler';

export function errorHandler(
  err: any,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (err instanceof HttpError) {
    return response.status(err.status).send({ message: err.message });
  }
  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
}
