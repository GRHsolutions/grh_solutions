import { Request, Response } from "express";
import { reportService } from "../services/report.service";

export const reportController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const filter = req.query;
      const reports = await reportService.getAll(filter);
      res.status(200).json(reports);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const report = await reportService.getById(req.params.id);
      res.status(200).json(report);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { title, description, user, request } = req.body;

      if (!title || !user || !request) {
        return res.status(400).json({ message: "Faltan campos obligatorios" });
      }

      const newReport = await reportService.create({
        title,
        description,
        user,
        request,
      });

      res.status(201).json(newReport);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const updated = await reportService.update(req.params.id, req.body);
      res.status(200).json(updated);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const deleted = await reportService.delete(req.params.id);
      res.status(200).json(deleted);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
};
