import { Request, Response } from "express";
import { requestsService } from "../services/requests.service";
import { requestTypeFilter } from "../filters/requests.filter";

export const requestsController = {
  create: async (req: Request, res: Response) => {
    try {
      const userId = req.userId;
      const { title, status, type_request, infoDx } = req.body;

      if (!userId) return res.status(401).json({ message: "Token inválido" });
      if (!title) return res.status(400).json({ message: "Título requerido" });
      if (!status) return res.status(400).json({ message: "Estado requerido" });
      if (!type_request) return res.status(400).json({ message: "Tipo requerido" });

      const newReq = await requestsService.create({
        createdBy: userId,
        title,
        status,
        type_request,
        infoDx,
      });

      res.status(201).json(newReq);
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const filtros = req.query as unknown as requestTypeFilter;
      const data = await requestsService.getAll(filtros);
      res.status(200).json(data);
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      if (!id || typeof id !== "string") {
        return res.status(400).json({ message: "ID requerido" });
      }

      const data = await requestsService.getById(id);
      if (!data) return res.status(404).json({ message: "No encontrada" });
      res.status(200).json(data);
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      if (!id || typeof id !== "string") {
        return res.status(400).json({ message: "ID requerido" });
      }

      const profileId = req.userId; 
      if (!profileId) return res.status(401).json({ message: "Token inválido" });

      const { title, status, type_request, infoDx } = req.body;
      const body = { title, status, type_request, infoDx };

      const updated = await requestsService.update(id, body, profileId);
      if (!updated) return res.status(404).json({ message: "Solicitud no encontrada" });

      res.status(200).json(updated);
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      if (!id || typeof id !== "string") {
        return res.status(400).json({ message: "ID requerido" });
      }

      const profileId = req.userId;
      if (!profileId) return res.status(401).json({ message: "Token inválido" });

      const deleted = await requestsService.delete(id, profileId);
      if (!deleted) return res.status(404).json({ message: "Solicitud no encontrada" });

      res.status(200).json({ message: "Solicitud desactivada" });
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  },
};
