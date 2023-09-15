import { Router } from 'express';
import passport from 'passport';
import { validatorHandler } from '../middlewares/validatorHandler';
import { loginSchema } from '../schemas/auth.schema';
import { AuthController } from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post(
  '/login',
  validatorHandler(loginSchema, 'body'),
  passport.authenticate('local'),
  AuthController.login
);

authRouter.get('/logout', AuthController.login);

export { authRouter };
