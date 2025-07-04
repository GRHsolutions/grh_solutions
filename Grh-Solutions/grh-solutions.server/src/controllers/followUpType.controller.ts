import { Request, Response } from "express";
import { followUpTypeService } from "../services/followUpType.service";

export const followUpTypeController = {
  create: async (req: Request, res: Response) => {
    try {
      const { id_type_follow_up, name, is_last_update } = req.body;

      if (!id_type_follow_up || !name) {
        return res.status(400).json({ message: "Campos obligatorios faltantes" });
      }

      const data = await followUpTypeService.create({ id_type_follow_up, name, is_last_update });
      return res.status(201).json(data);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  getAll: async (_req: Request, res: Response) => {
    try {
      const data = await followUpTypeService.getAll();
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

      const data = await followUpTypeService.getById(id);
      if (!data) {
        return res.status(404).json({ message: "Tipo de seguimiento no encontrado" });
      }

      return res.status(200).json(data);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      const updates = req.body;

      if (!id || typeof id !== "string") {
        return res.status(400).json({ message: "ID requerido" });
      }

      const updated = await followUpTypeService.update(id, updates);
      return res.status(200).json(updated);
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

      await followUpTypeService.delete(id);
      return res.status(200).json({ message: "Tipo de seguimiento eliminado correctamente" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
};
