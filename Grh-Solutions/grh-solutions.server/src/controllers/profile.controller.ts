import { Request, Response } from "express";
import { profileService } from "../services/profile.service";
import jwt from 'jsonwebtoken';

export const profileController = {
  create: async (req: Request, res: Response) => {
    try {
      const {
        user,
        name,
        lastname,
        date_of_birth,
        email,
        address,
        number_phone,
        telephone,
        rh,
        status,
        type_document,
        document,
        vacancy_name,
        date_application,
      } = req.body;

      if (
        !user ||
        !name ||
        !lastname ||
        !date_of_birth ||
        !email ||
        !address ||
        !number_phone ||
        !rh ||
        !status ||
        !type_document ||
        !document ||
        !vacancy_name
      ) {
        return res.status(400).json({ message: "Faltan campos obligatorios" });
      }

      const data = await profileService.create({
        user,
        name,
        lastname,
        date_of_birth,
        email,
        address,
        number_phone,
        telephone,
        rh,
        status,
        type_document,
        document,
        vacancy_name,
        date_application,
      });

      return res.status(201).json(data);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
        innerExpression: error.innerExpression,
      });
    }
  },

  getAll: async (_req: Request, res: Response) => {
    try {
      const data = await profileService.getAll();
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      if (!id || typeof id !== "string") {
        return res
          .status(400)
          .json({ message: "El parámetro `id` es requerido" });
      }
      const data = await profileService.getById(id);
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  getByUserId: async (req: Request, res: Response) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token no proporcionado" });
      }

      const token = authHeader.split(" ")[1];

      const decoded = jwt.verify(token, "my_secret") as {
        id: string;
        email: string;
        rol: string;
      };
      const data = await profileService.getByUserId(decoded.id);
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      if (!id || typeof id !== "string") {
        return res
          .status(400)
          .json({ message: "El parámetro `id` es requerido" });
      }

      const data = await profileService.update(id, req.body);
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      if (!id || typeof id !== "string") {
        return res
          .status(400)
          .json({ message: "El parámetro `id` es requerido" });
      }

      const data = await profileService.delete(id);
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  getTotalPages: async (req: Request, res: Response) => {
    try {
      const { name } = req.query;
      const data = await profileService.getTotalPages({ name });
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  getPaginated: async (req: Request, res: Response) => {
    try {
      const { name, currentPage, totalRow } = req.query;
      const data = await profileService.getPaginated({
        name: name?.toString(),
        currentPage: Number(currentPage),
        totalRow: Number(totalRow),
      });
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },
};
