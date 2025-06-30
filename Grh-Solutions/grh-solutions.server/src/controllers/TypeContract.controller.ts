import { typeContractService } from "../services/typeContract.service";
import { Response, Request } from "express";
export const typeContractController = {
  create: async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      if (name == "") {
        return res.status(400).json({
          message: "No hay nombre para el tipo de contrato",
        });
      }
      const data = await typeContractService.create({
        name: name,
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
      const { name } = req.body;
      if (name == "") {
        return res.status(400).json({
          message: "No hay nombre para el tipo de contrato",
        });
      }
      if (!id || typeof id !== "string") {
        return res.status(400).json({
          message: "El parámetro `id` es requerido y debe ser un string.",
        });
      }
      const data = await typeContractService.update(id, {
        name: name,
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

};
