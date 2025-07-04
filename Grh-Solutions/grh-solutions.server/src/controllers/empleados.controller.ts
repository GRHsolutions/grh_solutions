import { Request, Response } from "express";
import { empleadosService } from "../services/empleados.service";

export const empleadosController = {
  // create: async (req: Request, res: Response) => {
  //   try {
  //     const { users, puesto } = req.body;

  //     if (!Array.isArray(users) || users.length === 0) {
  //       return res.status(400).json({
  //         message: "Se debe proporcionar al menos un ID de usuario en 'users'",
  //       });
  //     }

  //     if (!puesto || typeof puesto !== "string" || puesto.trim() === "") {
  //       return res
  //         .status(400)
  //         .json({ message: "El campo 'puesto' es obligatorio" });
  //     }

  //     const data = await empleadosService.create({
  //       users,
  //       puesto: puesto.trim(),
  //     });

  //     return res.status(201).json(data);
  //   } catch (error: any) {
  //     return res.status(500).json({
  //       message: error.message,
  //       innerExpression: error.innerExpression,
  //     });
  //   }
  // },

  getAll: async (_req: Request, res: Response) => {
    try {
      const data = await empleadosService.getAll();
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;

      if (!id || typeof id !== "string" || id.trim() === "") {
        return res
          .status(400)
          .json({ message: "ID inválido para el empleado" });
      }

      const data = await empleadosService.getById(id.trim());

      if (!data) {
        return res.status(404).json({ message: "Empleado no encontrado" });
      }

      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      const { users, puesto } = req.body;

      if (!id || typeof id !== "string" || id.trim() === "") {
        return res.status(400).json({ message: "ID inválido" });
      }

      if (!users && !puesto) {
        return res.status(400).json({
          message:
            "Debes enviar al menos 'users' (array) o 'puesto' (string) para actualizar",
        });
      }

      const body: any = {};
      if (Array.isArray(users) && users.length > 0) body.users = users;
      if (puesto && typeof puesto === "string" && puesto.trim() !== "")
        body.puesto = puesto.trim();

      const data = await empleadosService.update(id.trim(), body);
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id || typeof id !== "string" || id.trim() === "") {
        return res.status(400).json({ message: "ID inválido" });
      }

      const data = await empleadosService.delete(id.trim());

      if (!data) {
        return res.status(404).json({ message: "Empleado no encontrado" });
      }

      return res
        .status(200)
        .json({ message: "Empleado eliminado correctamente" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
};
