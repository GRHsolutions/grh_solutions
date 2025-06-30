import { Response, Request } from "express";
import { vacanciesService } from "../services/vacancies.service";

export const vacanciesController = {
  create: async (req: Request, res: Response) => {
    try {
      const {
        tittle,
        description,
        type_contract,
        salary,
        horary,
        charge,
        address,
        telephone,
        email,
        type_modality,
        experience,
        formation,
        status,
      } = req.body;
      if (
        !tittle ||
        !description ||
        !type_contract ||
        !salary ||
        !horary ||
        !charge ||
        !address ||
        !telephone ||
        !email ||
        !type_modality ||
        !experience ||
        !formation ||
        !status
      ) {
        return res.status(400).json({
          message: "Faltan campos por rellenar",
        });
      }

      const data = await vacanciesService.create({
        tittle,
        description,
        type_contract,
        salary,
        horary,
        charge,
        address,
        telephone,
        email,
        type_modality,
        experience,
        formation,
        status,
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
      const data = await vacanciesService.getAll({});
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
      const data = await vacanciesService.getById(id);
      return res.status(200).json(data);
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
      if (!id || typeof id !== "string") {
        return res.status(400).json({
          message: "El parámetro `id` es requerido y debe ser un string.",
        });
      }
      const { tittle } = req.body;
      const data = await vacanciesService.update(id, { tittle });
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
      const data = await vacanciesService.delete(id);
      return res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
        innerExpression: error.innerExpression,
      });
    }
  },
  getTotalPages: async (req: Request, res: Response) => {
    try {
      const { tittle } = req.query;
      if (!tittle || typeof tittle !== "string") {
        return res.status(400).json({
          message: "El parámetro `id` es requerido y debe ser un string.",
        });
      }
      const data = await vacanciesService.getTotalPages({ tittle });
      return res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
        innerExpression: error.innerExpression,
      });
    }
  },
  getPaginated: async (req: Request, res: Response) => {
    try {
      const { tittle } = req.query;
      if (!tittle || typeof tittle !== "string") {
        return res.status(400).json({
          message: "El parámetro `id` es requerido y debe ser un string.",
        });
      }
      const data = await vacanciesService.getPaginated({ tittle });
      return res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
        innerExpression: error.innerExpression,
      });
    }
  },
};
