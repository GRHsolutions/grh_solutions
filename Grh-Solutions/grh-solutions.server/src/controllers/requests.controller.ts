import { Request, Response } from "express";
import { requestsService } from "../services/requests.service";
import { requestTypeFilter } from "../filters/requests.filter";

export const solicitudesController = {

  create: async (req: Request, res: Response) => {
    try {
      const { fk, title, status, type_request, info } = req.body;

      if (!fk || typeof fk !== "string") {
        return res.status(400).json({ message: "ID de referencia (fk) inválido" });
      }

      if (!title || typeof title !== "string") {
        return res.status(400).json({ message: "Título de solicitud requerido" });
      }

      if (!status || typeof status !== "string") {
        return res.status(400).json({ message: "Estado de solicitud requerido" });
      }

      if (!type_request || typeof type_request !== "string") {
        return res.status(400).json({ message: "Tipo de solicitud requerido" });
      }

      const newRequest = {
        fk,
        title,
        status,
        type_request,
        info,
        created_request: new Date(),
        update_request: new Date(),
      };

      const data = await requestsService.create(newRequest);
      return res.status(201).json(data);
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
        innerExpression: error.innerExpression,
      });
    }
  },


  getAll: async (req: Request, res: Response) => {
    try {
      const filters: requestTypeFilter = req.query;
      const solicitudes = await requestsService.getAll(filters);
      return res.status(200).json(solicitudes);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },


  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "ID requerido" });
      }

      const solicitud = await requestsService.getById(id);
      if (!solicitud) {
        return res.status(404).json({ message: "Solicitud no encontrada" });
      }

      return res.status(200).json(solicitud);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },


  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updates = {
        ...req.body,
        update_request: new Date(),
      };

      if (!id) {
        return res.status(400).json({ message: "ID requerido" });
      }

      const updated = await requestsService.update(id, updates);
      return res.status(200).json(updated);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },


  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "ID requerido" });
      }

      await requestsService.delete(id);
      return res.status(200).json({ message: "Solicitud eliminada correctamente" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
};
