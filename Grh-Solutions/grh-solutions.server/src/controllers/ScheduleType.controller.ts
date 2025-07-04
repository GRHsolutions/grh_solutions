import { Response, Request } from "express";
import { scheduleTypeService } from "../services/ScheduleType.service";

export const scheduleTypeController = {
  create: async (req: Request, res: Response) => {
    try {
      /*
        -------------------------------------------------------------------
        AQUI SE USAN HORAS NO FECHASSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
        -------------------------------------------------------------------
      */
      const { name, start_Date, end_Date } = req.body;

      if (!name || name.trim() === "") {
        return res
          .status(400)
          .json({ message: "No hay nombre para el tipo de horario" });
      }
      if (!start_Date || !end_Date) {
        return res
          .status(400)
          .json({ message: "start_Date y end_Date son obligatorios" });
      }
      const start = new Date(start_Date);
      const end = new Date(end_Date);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res
          .status(400)
          .json({ message: "Las fechas no tienen un formato válido" });
      }
      if (start >= end) {
        return res
          .status(400)
          .json({ message: "start_Date debe ser anterior a end_Date" });
      }

      const data = await scheduleTypeService.create({
        name: name.trim(),
        start_Date: start,
        end_Date: end,
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

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      const { name, start_Date, end_Date } = req.body;

      if (!id || typeof id !== "string" || id.trim() === "") {
        return res.status(400).json({ message: "ID inválido" });
      }
      if (!name && !start_Date && !end_Date) {
        return res
          .status(400)
          .json({ message: "Debe enviar al menos un campo para actualizar" });
      }

      const updateBody: any = {};
      if (name) updateBody.name = name.trim();
      if (start_Date) updateBody.start_Date = new Date(start_Date);
      if (end_Date) updateBody.end_Date = new Date(end_Date);

      if (
        updateBody.start_Date &&
        updateBody.end_Date &&
        updateBody.start_Date >= updateBody.end_Date
      ) {
        return res
          .status(400)
          .json({ message: "start_Date debe ser anterior a end_Date" });
      }

      const data = await scheduleTypeService.update(id.trim(), updateBody);
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

      const data = await scheduleTypeService.delete(id.trim());
      if (!data)
        return res
          .status(404)
          .json({ message: "Tipo de horario no encontrado" });
      return res
        .status(200)
        .json({ message: "Tipo de horario eliminado correctamente" });
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

      const data = await scheduleTypeService.getById(id.trim());
      if (!data)
        return res
          .status(404)
          .json({ message: "Tipo de horario no encontrado" });
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
};
