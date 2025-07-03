import { Response, Request } from "express";
import { schedulesService } from "../services/schedules.service";

export const schedulesController = {
  create: async (req: Request, res: Response) => {
    try {
      const { start_date, end_date, group, scheduleType } = req.body;

      // ── Validación básica ──
      if (!start_date || !end_date || !group || !scheduleType) {
        return res.status(400).json({ message: "Faltan campos obligatorios" });
      }
      const start = new Date(start_date);
      const end   = new Date(end_date);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res.status(400).json({ message: "Fechas inválidas" });
      }
      if (start >= end) {
        return res.status(400).json({ message: "start_date debe ser anterior a end_date" });
      }
      // ──────────────────────

      const data = await schedulesService.create({
        start_date: start,
        end_date: end,
        group: group.trim(),
        scheduleType: scheduleType.trim(),
      });

      return res.status(201).json(data);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
getAll: async (_req: Request, res: Response) => {
  try {
    const data = await schedulesService.getAll(); // ← sin argumentos
    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
},

update: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      const { start_date, end_date, group, scheduleType } = req.body;

      if (!id || typeof id !== "string" || id.trim() === "") {
        return res.status(400).json({ message: "ID inválido" });
      }
      if (!start_date && !end_date && !group && !scheduleType) {
        return res.status(400).json({ message: "No hay campos para actualizar" });
      }

      const body: any = {};
      if (start_date) body.start_date = new Date(start_date);
      if (end_date)   body.end_date   = new Date(end_date);
      if (group)      body.group      = group.trim();
      if (scheduleType) body.scheduleType = scheduleType.trim();

      if (body.start_date && body.end_date && body.start_date >= body.end_date) {
        return res.status(400).json({ message: "start_date debe ser anterior a end_date" });
      }

      const data = await schedulesService.update(id.trim(), body);
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

      const data = await schedulesService.delete(id.trim());
      if (!data) return res.status(404).json({ message: "Horario no encontrado" });
      return res.status(200).json({ message: "Horario eliminado correctamente" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      if (!id || typeof id !== "string" || id.trim() === "") {
        return res.status(400).json({ message: "ID inválido" });
      }

      const data = await schedulesService.getById(id.trim());
      if (!data) return res.status(404).json({ message: "Horario no encontrado" });
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
};
