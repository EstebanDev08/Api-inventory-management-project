import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/user.service';

const userService = new UserService();

class UserController {
  static async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const user = await userService.findOneUser(parseInt(id));

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const { query } = req;

      const users = await userService.findUsers(query);

      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = req;

      const newUser = await userService.createUser(body);

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }

  static async isAvalibleEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email } = req.body;

      const isEmailUnique = await userService.isEmailUnique(email);

      res.status(200).json({ isAvalible: isEmailUnique });
    } catch (error) {
      next(error);
    }
  }
}

export { UserController };
