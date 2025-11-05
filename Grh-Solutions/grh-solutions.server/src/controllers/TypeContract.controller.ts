import { typeContractService } from "../services/typeContract.service";
import { Response, Request } from "express";

export const typeContractController = {
  create: async (req: Request, res: Response) => {
    try {
      const { name, description, content } = req.body;

      if (!name || name.trim() === "") {
        return res.status(400).json({
          message: "El nombre del tipo de contrato es obligatorio.",
        });
      }

      const data = await typeContractService.create({
        name,
        description,
        content,
      });

      return res.status(201).json(data);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
        innerExpression: error.innerExpression,
      });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      const { name, description, content } = req.body;

      if (!id || typeof id !== "string") {
        return res.status(400).json({
          message: "El parámetro `id` es requerido y debe ser un string.",
        });
      }

      if (!name || name.trim() === "") {
        return res.status(400).json({
          message: "El nombre del tipo de contrato es obligatorio.",
        });
      }

      const data = await typeContractService.update(id, {
        name,
        description,
        content,
      });

      return res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
        innerExpression: error.innerExpression,
      });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;

      if (!id || typeof id !== "string") {
        return res.status(400).json({
          message: "El parámetro `id` es requerido y debe ser un string.",
        });
      }

      const data = await typeContractService.delete(id);

      return res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
        innerExpression: error.innerExpression,
      });
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const data = await typeContractService.getAll();
      return res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
        innerExpression: error.innerExpression,
      });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;

      if (!id || typeof id !== "string") {
        return res.status(400).json({
          message: "El parámetro `id` es requerido y debe ser un string.",
        });
      }

      const data = await typeContractService.getById(id);

      if (!data) {
        return res.status(404).json({ message: "Tipo de contrato no encontrado." });
      }

      return res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
        innerExpression: error.innerExpression,
      });
    }
  },
};
