import { Request, Response } from "express";
import { signatureFilter } from "../filters/signature.filter";
import { signatureService } from "../services/signatures.service";

export const signatureController = {
  // Crear firma
  create: async (req: Request, res: Response) => {
    try {
      const { empleado, contrato, signatures } = req.body;

      if (!empleado || !contrato || typeof signatures !== "boolean") {
        return res
          .status(400)
          .json({ message: "Faltan campos obligatorios o el tipo de datos no es válido" });
      }

      const data = await signatureService.create({
        empleado: empleado.trim(),
        contrato: contrato.trim(),
        signatures,
      });

      return res.status(201).json(data);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },

  // Obtener todos
  getAll: async (req: Request, res: Response) => {
    try {
      const filter: signatureFilter = {};
      const { empleado, contrato, signatures } = req.query;

      if (empleado && typeof empleado === "string" && empleado.trim() !== "") {
        filter.empleado = empleado.trim();
      }

      if (contrato && typeof contrato === "string" && contrato.trim() !== "") {
        filter.contrato = contrato.trim();
      }

      if (signatures !== undefined) {
        if (signatures === "true" || signatures === "false") {
          filter.signatures = signatures === "true";
        } else {
          return res.status(400).json({
            message: "El campo signatures debe ser true o false",
          });
        }
      }

      const data = await signatureService.getAll(filter);
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },

  // Obtener por ID
  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;

      if (!id || typeof id !== "string" || id.trim() === "") {
        return res.status(400).json({ message: "ID inválido" });
      }

      const data = await signatureService.getById(id.trim());
      if (!data)
        return res
          .status(404)
          .json({ message: "Firma no encontrada" });

      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },

  // Actualizar
  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      const { empleado, contrato, signatures } = req.body;

      if (!id || typeof id !== "string" || id.trim() === "") {
        return res.status(400).json({ message: "ID inválido" });
      }

      const body: any = {};
      if (empleado) body.empleado = empleado.trim();
      if (contrato) body.contrato = contrato.trim();
      if (typeof signatures === "boolean") body.signatures = signatures;

      if (Object.keys(body).length === 0) {
        return res
          .status(400)
          .json({ message: "No hay campos para actualizar" });
      }

      const data = await signatureService.update(id.trim(), body);
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },

  // Eliminar
  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;

      if (!id || typeof id !== "string" || id.trim() === "") {
        return res.status(400).json({ message: "ID inválido" });
      }

      const data = await signatureService.delete(id.trim());
      if (!data)
        return res
          .status(404)
          .json({ message: "Firma no encontrada" });

      return res
        .status(200)
        .json({ message: "Firma eliminada correctamente" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
};
