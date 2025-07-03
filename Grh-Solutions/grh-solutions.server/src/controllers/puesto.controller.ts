import { Response, Request } from "express";
import { puestoService } from "../services/puesto.service";

export const puestoController = {
create: async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        message: "No hay nombre para el puesto",
      });
    }

    const data = await puestoService.create({ name: name.trim() });
    return res.status(201).json(data);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      innerExpression: error.innerExpression,
    });
  }
},

  getAll: async (req: Request, res: Response) => {
    try {
      const { name } = req.query;

      const data = await puestoService.getAll({
        name: typeof name === "string" ? name : undefined,
      });

      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      const { name } = req.body;

      if (!id || typeof id !== "string" || id.trim() === "") {
        return res.status(400).json({ message: "ID inválido" });
      }

      if (!name || name.trim() === "") {
        return res.status(400).json({ message: "El nombre es obligatorio" });
      }

      const data = await puestoService.update(id.trim(), { name });
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      if (!id || typeof id !== "string" || id.trim() === "") {
        return res.status(400).json({ message: "ID inválido" });
      }

      const data = await puestoService.delete(id.trim());
      if (!data) {
        return res.status(404).json({ message: "puesto no encontrado" });
      }

      return res
        .status(200)
        .json({ message: "puesto eliminada correctamente" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
    getById: async (req: Request, res: Response) => {
      try {
        const { id } = req.query;
        if (!id || typeof id !== "string" || id.trim() === "") {
          return res.status(400).json({ message: "ID inválido para el puesto" });
        }
  
        const data = await puestoService.getById(id.trim());
        if (!data) {
          return res.status(404).json({ message: "puesto no encontrado" });
        }
  
        return res.status(200).json(data);
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    },
};
