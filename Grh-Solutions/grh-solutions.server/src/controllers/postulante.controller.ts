import { Request, Response } from "express";
import { postulanteService } from "../services/postulante.service";
import jwt from 'jsonwebtoken';

export const postulanteController = {
  create: async (req: Request, res: Response) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token no proporcionado" });
      }

      const token = authHeader.split(" ")[1]; // Elimina el 'Bearer '

      // Verifica y decodifica el token
      const decoded = jwt.verify(token, "my_secret") as {
        id: string;
        email: string;
        rol: string;
      };

      const { vacante, status } = req.body;

      if (!vacante || typeof vacante !== "string") {
        return res
          .status(400)
          .json({ message: "Debe enviar el ID de la vacante" });
      }

      const newPostulante = {
        user: decoded.id, // 👈 El ID del usuario autenticado viene del token
        vacante,
        application_date: new Date(),
        status: status || "Pendiente",
      };

      const data = await postulanteService.create(newPostulante);
      return res.status(201).json(data);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
        innerExpression: error.innerExpression,
      });
    }
  },

  getAllByVacante: async (req: Request, res: Response) => {
    try {
      const { vacanteId } = req.params;

      if (!vacanteId) {
        return res.status(400).json({ message: "vacanteId es requerido" });
      }

      const postulantes = await postulanteService.getAllByVacante(vacanteId);
      res.status(200).json(postulantes);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  // Actualizar un postulante por ID
  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      if (!id || typeof id !== "string") {
        return res.status(400).json({ message: "ID inválido" });
      }

      const updatedPostulante = await postulanteService.update(id, updates);
      return res.status(200).json(updatedPostulante);
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id || typeof id !== "string") {
        return res.status(400).json({ message: "ID inválido" });
      }

      await postulanteService.delete(id);
      return res
        .status(200)
        .json({ message: "Postulante eliminado correctamente" });
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
};
