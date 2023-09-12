import { Strategy } from 'passport-local';
import { UserService } from '../../services/user.service';
import * as Boom from '@hapi/boom';
import { verifyData } from '../../../../framework/utils/bcrypt';
import passport from 'passport';

const localStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const userService = new UserService();

      const user = await userService.findByEmail(email);

      if (!user) {
        throw Boom.badRequest('email or user incorrect');
      }

      const isMatch = await verifyData(password, user.dataValues.password);

      if (!isMatch) {
        throw Boom.badRequest('email or user incorrect');
      }

      delete user.dataValues.password;

      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

const service = new UserService();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await service.findOneUser(id as number);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export { localStrategy };
