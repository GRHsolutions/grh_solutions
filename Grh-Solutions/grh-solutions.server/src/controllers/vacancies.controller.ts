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
        area,
        address,
        telephone,
        email,
        type_modality,
        experience,
        formation,
        status,
      } = req.body;

      if (
        !tittle || !description || !type_contract || !salary || !horary ||
        !address || !telephone || !email || !type_modality || !experience ||
        !formation || !status
      ) {
        return res.status(400).json({
          message: "Faltan campos obligatorios por rellenar",
        });
      }

      const data = await vacanciesService.create({
        tittle,
        description,
        type_contract,
        salary,
        horary,
        charge,
        area,
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
      res.status(500).json({
        message: "Error al crear la vacante",
        error: error.message,
      });
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const { tittle } = req.query;

      const data = await vacanciesService.getAll({
        tittle: tittle as string,
      });

      return res.status(200).json(data);
    } catch (error: any) {
      res.status(500).json({
        message: "Error al obtener las vacantes",
        error: error.message,
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
      res.status(404).json({
        message: "Vacante no encontrada",
        error: error.message,
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

      const data = await vacanciesService.update(id, req.body);
      return res.status(200).json(data);
    } catch (error: any) {
      res.status(500).json({
        message: "Error al actualizar la vacante",
        error: error.message,
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
      return res.status(200).json({ message: "Vacante eliminada correctamente", data });
    } catch (error: any) {
      res.status(500).json({
        message: "Error al eliminar la vacante",
        error: error.message,
      });
    }
  },

  getTotalPages: async (req: Request, res: Response) => {
    try {
      const { tittle, totalRow } = req.query;

      const data = await vacanciesService.getTotalPages({
        tittle: tittle as string,
        totalRow: totalRow ? parseInt(totalRow as string) : undefined,
      });

      return res.status(200).json({ totalPages: data });
    } catch (error: any) {
      res.status(500).json({
        message: "Error al calcular el total de páginas",
        error: error.message,
      });
    }
  },

  getPaginated: async (req: Request, res: Response) => {
    try {
      const { tittle, currentPage, totalRow } = req.query;

      const data = await vacanciesService.getPaginated({
        tittle: tittle as string,
        currentPage: currentPage ? parseInt(currentPage as string) : undefined,
        totalRow: totalRow ? parseInt(totalRow as string) : undefined,
      });

      return res.status(200).json(data);
    } catch (error: any) {
      res.status(500).json({
        message: "Error al obtener las vacantes paginadas",
        error: error.message,
      });
    }
  },
};
