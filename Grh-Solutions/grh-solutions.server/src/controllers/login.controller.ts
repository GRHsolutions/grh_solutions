import { Response, Request } from 'express';
import { userService } from '../services/users.service';

export const loginController = {
  register: async (req: Request, res: Response) => {
    try {
      const data = await userService.create(req.body);
      return res.status(201).json(data)
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { correo, contraseña } = req.body

      if (!correo || !contraseña) {
        return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
      }

      const { user, token } = await userService.login(correo, contraseña);

      // Respondemos con el usuario y el token
      return res.status(200).json({ user, token });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  },
};
