import { isBoom } from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';
import { Error, ValidationError } from 'sequelize';

function logErrors(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err, '*********** Validation Error ***********');
  next(err);
}

function errorHandler(err: Error, req: Request, res: Response) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (isBoom(err)) {
    const { output } = err;

    res.status(output.statusCode).json(output.payload);
  }

  next(err);
}

function ormErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ValidationError) {
    console.log('ormmmmmmmmmmm');
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      Error: err.errors[0].message,
    });
  }
  next(err);
}

export { logErrors, boomErrorHandler, errorHandler, ormErrorHandler };
