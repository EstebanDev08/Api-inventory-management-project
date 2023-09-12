import { NextFunction, Request, Response } from 'express';

class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;

      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  static logout(req: Request, res: Response) {
    console.log(req.session);

    req.session.destroy((err) => {
      if (err) {
        console.error('Error al destruir la sesión:', err);
      }

      // Redirigir al usuario a la página de inicio de sesión
      res.redirect('/login');
    });

    req.session.destroy((err) => {
      if (err) {
        console.error('Error al destruir la sesión:', err);
      }
      // Otras acciones después de destruir la sesión
    });
  }
}

export { AuthController };
