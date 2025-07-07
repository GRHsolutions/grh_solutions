import { Request, Response } from "express";
import { historyService } from "../services/history.service";

export const historyController = {
  create: async (req: Request, res: Response) => {
    try {
      const { id_history, event, user_fk } = req.body;

      if (!id_history || !event || !user_fk) {
        return res.status(400).json({ message: "Faltan campos obligatorios" });
      }

      const data = await historyService.create({ id_history, event, user_fk });
      return res.status(201).json(data);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  getAll: async (_req: Request, res: Response) => {
    try {
      const data = await historyService.getAll();
      return res.status(200).json(data);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;

      if (!id || typeof id !== "string") {
        return res.status(400).json({ message: "ID requerido" });
      }

      const data = await historyService.getById(id);
      if (!data) {
        return res.status(404).json({ message: "Historial no encontrado" });
      }

      return res.status(200).json(data);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;

      if (!id || typeof id !== "string") {
        return res.status(400).json({ message: "ID requerido" });
      }

      await historyService.delete(id);
      return res.status(200).json({ message: "Registro de historial eliminado correctamente" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
};
