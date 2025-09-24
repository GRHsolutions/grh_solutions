import { Request, Response } from "express";
import { involvedService } from "../services/involved.service";
import mongoose from "mongoose";

export const involvedController = {
  create: async (req: Request, res: Response) => {
    try {
      const { requestId, profileId, role, assignedBy } = req.body;

      if (!requestId) return res.status(400).json({ message: "requestId requerido" });
      if (!profileId) return res.status(400).json({ message: "profileId requerido" });
      if (!role) return res.status(400).json({ message: "role requerido" });

      const newInvolved = await involvedService.create({ requestId, profileId, role, assignedBy });
      res.status(201).json(newInvolved);
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const filter: any = {};
      if (req.query.requestId) filter.requestId = req.query.requestId as string;
      if (req.query.profileId) filter.profileId = req.query.profileId as string;

      const data = await involvedService.getAll(Object.keys(filter).length ? filter : {});
      res.status(200).json(data);
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const id = req.query.id as string;
      if (!id) return res.status(400).json({ message: "ID requerido" });

      const data = await involvedService.getById(id);
      if (!data) return res.status(404).json({ message: "Involucrado no encontrado" });

      res.status(200).json(data);
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  },

  // ✅ Nuevo método para traer todos los involucrados de una solicitud
  getByRequestId: async (req: Request, res: Response) => {
    try {
      const requestId = req.query.requestId as string;
      if (!requestId) return res.status(400).json({ message: "requestId requerido" });

      const data = await involvedService.getAll({ requestId });
      if (!data || data.length === 0) return res.status(404).json({ message: "No se encontraron involucrados" });

      res.status(200).json(data);
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const id = req.query.id as string;
      if (!id) return res.status(400).json({ message: "ID requerido" });

      const { createdAt, updatedAt, ...updates } = req.body;

      const updated = await involvedService.update(id, updates);
      if (!updated) return res.status(404).json({ message: "Involucrado no encontrado" });

      res.status(200).json(updated);
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const id = req.query.id as string;
      if (!id) return res.status(400).json({ message: "ID requerido" });

      const deleted = await involvedService.delete(id);
      if (!deleted) return res.status(404).json({ message: "Involucrado no encontrado" });

      res.status(200).json({ message: "Involucrado eliminado" });
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  },
};
