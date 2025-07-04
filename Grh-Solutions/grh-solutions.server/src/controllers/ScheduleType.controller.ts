import { Response, Request } from "express";
import { scheduleTypeService } from "../services/ScheduleType.service";

export const scheduleTypeController = {
  create: async (req: Request, res: Response) => {
    try {
      const { name, startTime, endTime } = req.body;

      if (!name || !startTime || !endTime) {
        return res.status(400).json({
          message: "Todos los campos (name, startTime, endTime) son obligatorios",
        });
      }
      const timeRegex = /^([0-1]\d|2[0-3]):([0-5]\d)$/;
      if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
        return res.status(400).json({
          message: "El formato de hora debe ser HH:mm (por ejemplo, 08:30)",
        });
      }

      if (startTime >= endTime) {
        return res.status(400).json({
          message: "startTime debe ser anterior a endTime",
        });
      }

      const data = await scheduleTypeService.create({
        name: name.trim(),
        startTime,
        endTime,
      });

      return res.status(201).json(data);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
        innerExpression: error.innerExpression,
      });
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const { name } = req.query;
      const data = await scheduleTypeService.getAll({
        name: typeof name === "string" ? name : undefined,
      });
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      if (!id || typeof id !== "string") {
        return res.status(400).json({ message: "ID inválido" });
      }

      const data = await scheduleTypeService.getById(id);
      if (!data) {
        return res.status(404).json({ message: "Tipo de horario no encontrado" });
      }

      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      const { name, startTime, endTime } = req.body;

      if (!id || typeof id !== "string") {
        return res.status(400).json({ message: "ID inválido" });
      }
      const updateBody: any = {};
      if (name) updateBody.name = name.trim();
      if (startTime) updateBody.startTime = startTime;
      if (endTime) updateBody.endTime = endTime;

      if (startTime && endTime) {
        if (startTime >= endTime) {
          return res.status(400).json({
            message: "startTime debe ser anterior a endTime",
          });
        }
        const timeRegex = /^([0-1]\d|2[0-3]):([0-5]\d)$/;
        if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
          return res.status(400).json({
            message: "El formato de hora debe ser HH:mm",
          });
        }
      }

      const data = await scheduleTypeService.update(id, updateBody);
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      if (!id || typeof id !== "string") {
        return res.status(400).json({ message: "ID inválido" });
      }

      const data = await scheduleTypeService.delete(id);
      if (!data) {
        return res.status(404).json({ message: "Tipo de horario no encontrado" });
      }

      return res.status(200).json({ message: "Eliminado correctamente" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
};
