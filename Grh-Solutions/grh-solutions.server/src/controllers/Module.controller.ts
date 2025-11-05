import { Request, Response } from "express";
import { moduleService } from "../services/module.service";

export const moduleController = {
  create: async (req: Request, res: Response) => {
    try {
      const { name, description, disabled } = req.body;

      if (!name || name.trim() === "") {
        return res
          .status(400)
          .json({ message: "El nombre del módulo es obligatorio." });
      }

      const module = await moduleService.create({
        name,
        description,
        disabled,
      });
      return res.status(201).json(module);
    } catch (error: any) {
      res.status(error.message.includes("Ya existe") ? 409 : 500).json({
        message: "Error al crear el módulo",
        error: error.message,
      });
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const { name, includeDisabled } = req.query;

      const modules = await moduleService.getAll({
        name: name as string,
        includeDisabled:
          includeDisabled === "true"
            ? true
            : includeDisabled === "false"
            ? false
            : undefined,
      });

      return res.status(200).json(modules);
    } catch (error: any) {
      res.status(500).json({
        message: "Error al obtener los módulos",
        error: error.message,
      });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;

      if (!id || typeof id !== "string") {
        return res.status(400).json({ message: "ID inválido" });
      }

      const module = await moduleService.getById(id);
      return res.status(200).json(module);
    } catch (error: any) {
      res.status(404).json({
        message: "Error al obtener el módulo",
        error: error.message,
      });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      const { name, description, disabled } = req.body;

      if (!id || typeof id !== "string") {
        return res.status(400).json({ message: "ID inválido" });
      }

      const updated = await moduleService.update(id, {
        name,
        description,
        disabled,
      });
      return res.status(200).json(updated);
    } catch (error: any) {
      res.status(500).json({
        message: "Error al actualizar el módulo",
        error: error.message,
      });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;

      if (!id || typeof id !== "string") {
        return res.status(400).json({ message: "ID inválido" });
      }

      await moduleService.delete(id);
      return res
        .status(200)
        .json({ message: "Módulo deshabilitado correctamente" });
    } catch (error: any) {
      res.status(500).json({
        message: "Error al eliminar el módulo",
        error: error.message,
      });
    }
  },
};
