import { Request, Response } from "express";
import { requestsService } from "../services/requests.service";
import { requestTypeFilter } from "../filters/requests.filter";

export const requestsController = {
  create: async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;
      const { title, type_request, infoDx, file } = req.body;

      if (!userId) return res.status(401).json({ message: "Token inválido" });
      if (!title) return res.status(400).json({ message: "Título requerido" });
      if (!type_request) return res.status(400).json({ message: "Tipo requerido" });

      const newReq = await requestsService.create(
        { title, status: "pendiente", type_request, infoDx, file },
        userId
      );

      return res.status(201).json(newReq);
    } catch (e: any) {
      console.error("[requestsController.create] ERROR:", e);
      return res.status(500).json({ message: e?.message ?? "Error interno" });
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const filtros = req.query as unknown as requestTypeFilter;
      const data = await requestsService.getAll(filtros);
      return res.status(200).json(data);
    } catch (e: any) {
      console.error("[requestsController.getAll] ERROR:", e);
      return res.status(500).json({ message: e?.message ?? "Error interno" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      if (!id || typeof id !== "string") return res.status(400).json({ message: "ID requerido" });

      const data = await requestsService.getById(id);
      if (!data) return res.status(404).json({ message: "No encontrada" });

      return res.status(200).json(data);
    } catch (e: any) {
      console.error("[requestsController.getById] ERROR:", e);
      return res.status(500).json({ message: e?.message ?? "Error interno" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      if (!id || typeof id !== "string") return res.status(400).json({ message: "ID requerido" });

      const { title, status, type_request, infoDx, file } = req.body;
      const body: any = { title, status, type_request, infoDx };
      if (file) body.file = file;

      const updated = await requestsService.update(id, body);
      if (!updated) return res.status(404).json({ message: "Solicitud no encontrada" });

      return res.status(200).json(updated);
    } catch (e: any) {
      console.error("[requestsController.update] ERROR:", e);
      return res.status(500).json({ message: e?.message ?? "Error interno" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      if (!id || typeof id !== "string") return res.status(400).json({ message: "ID requerido" });

      const deleted = await requestsService.delete(id);
      if (!deleted) return res.status(404).json({ message: "Solicitud no encontrada" });

      return res.status(200).json({ message: "Solicitud desactivada" });
    } catch (e: any) {
      console.error("[requestsController.delete] ERROR:", e);
      return res.status(500).json({ message: e?.message ?? "Error interno" });
    }
  },
};
