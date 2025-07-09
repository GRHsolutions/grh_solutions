import { Response, Request } from "express";
import { userService } from "../services/users.service";
import bcrypt from "bcrypt";

export const userController = {
  getMyInfo: async (req: Request, res: Response) => {
    try {
      const { userId } = req;

      if (userId == undefined) {
        return res.status(500).json({
          message: "Internal error",
          innerExpression:
            "userId detected as undefined check the token validation",
        });
      }

      const data = await userService.getById(userId);
      return res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
  updateUser: async (req: Request, res: Response) => {
    try {
      const userId = req.userId;
      const { firstName, middleName, lastName, secondLastName, typeDocument } =
        req.body;

      if (!userId) {
        return res.status(500).json({
          message: "userId detected as undefined check the token validation",
        });
      }

      const updatedUser = await userService.update(userId, {
        firstName,
        middleName,
        lastName,
        secondLastName,
        typeDocument,
      });

      return res.status(200).json(updatedUser);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
  getAll: async (_req: Request, res: Response) => {
    try {
      const users = await userService.getAllUsers();
      return res.status(200).json(users);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
getById: async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "ID inválido" });
  }

  try {
    const user = await userService.getById(id);
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
},
  update: async (req: Request, res: Response) => {
    const { id } = req.query;
    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "ID inválido" });
    }

    try {
      const updated = await userService.update(id, req.body);
      return res.status(200).json(updated);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
  delete: async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "ID inválido" });
    }

    try {
      const user = await userService.delete(id);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      return res
        .status(200)
        .json({ message: "Usuario desactivado (isActive: false)" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
  changePassword: async (req: Request, res: Response) => {
    try {
      const userId = req.userId;
      const { currentPassword, newPassword } = req.body;

      if (!userId) {
        return res.status(401).json({ message: "No autorizado" });
      }

      if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: "Contraseñas incompletas" });
      }

      const user = await userService.getById(userId);
      const passwordMatch = await bcrypt.compare(
        currentPassword,
        user.password
      );

      if (!passwordMatch) {
        return res
          .status(401)
          .json({ message: "Contraseña actual incorrecta" });
      }
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      await userService.update(userId, { password: hashedNewPassword });

      return res
        .status(200)
        .json({ message: "Contraseña actualizada correctamente" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
};
