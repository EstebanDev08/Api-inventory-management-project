import * as Boom from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';

function verifySession(req: Request, res: Response, next: NextFunction) {
  console.log('User isAuthenticated:', req.isAuthenticated());
  if (!req.isAuthenticated()) {
    return next(Boom.unauthorized('Acceso no autorizado'));
  }
  // El usuario está autenticado, permite el acceso a la ruta
  next();
}

export { verifySession };
