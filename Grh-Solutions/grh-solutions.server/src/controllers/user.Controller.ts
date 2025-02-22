import { Response, Request } from 'express';
import { userService } from '../services'; // Asegúrate de tener este servicio creado
import { UserFilter } from '../filters/userFilter';

export const userController = {
  getAllUsers: async (req: Request, res: Response) => {
    try {
      const filter: UserFilter = {};

      // Solo agregamos 'nombre' si está definido en los parámetros de consulta
      if (req.query.nombre) {
        filter.nombre = req.query.nombre as string; // Aseguramos que sea un string
      }

      const data = await userService.getAll(filter);
      return res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },

  createUser: async (req: Request, res: Response) => {
    try {
      const data = await userService.create(req.body);
      return res.status(201).json(data)
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },

  updateUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = await userService.update(id, req.body);
      return res.json(data);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = await userService.delete(id);
      return res.json(data);
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
