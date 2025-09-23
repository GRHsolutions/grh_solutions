import { Request, Response } from "express";
import { historyService } from "../services/history.service";

export const historyController = {
  getByRequestId: async (req: Request, res: Response) => {
    try {
      const { requestId } = req.query;
      if (!requestId) return res.status(400).json({ message: "requestId requerido" });

      const data = await historyService.getAllByRequestId(requestId as string);
      res.status(200).json(data);
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      if (!id) return res.status(400).json({ message: "ID requerido" });

      const data = await historyService.getById(id as string);
      if (!data) return res.status(404).json({ message: "Historial no encontrado" });

      res.status(200).json(data);
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  },
};