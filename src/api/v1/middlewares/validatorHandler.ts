import { badRequest } from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';

const validatorHandler = (shema: Schema, property: keyof Request) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[property];

    const { error } = shema.validate(data, { abortEarly: false });
    if (error) {
      console.log('ormmmmmmmmmmm');
      next(badRequest(error));

      res.status(409).json({ error: badRequest(error).message });
    }
    next();
  };
};

export { validatorHandler };
