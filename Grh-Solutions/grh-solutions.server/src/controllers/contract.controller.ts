import { Response, Request } from "express";
import { contractService } from "../services/contract.service";

export const contractController = {
  // Crear contrato
  create: async (req: Request, res: Response) => {
    try {
      const {
        perfil_creador,
        perfil_empleado,
        eps,
        estrato,
        start_date,
        end_date,
        tipo_contrato,
        arl,
        firma_empleado,
        firma_empleador,
        estado,
        title,
        vacante
      } = req.body;

      // Validación de campos obligatorios
      if (
        !perfil_creador ||
        !perfil_empleado ||
        !eps ||
        !estrato ||
        !start_date ||
        !tipo_contrato ||
        !arl ||
        !title ||
        !vacante
      ) {
        return res.status(400).json({ message: "Faltan campos obligatorios" });
      }

      const data = await contractService.create({
        perfil_creador: perfil_creador.trim(),
        perfil_empleado: perfil_empleado.trim(),
        eps: eps.trim(),
        estrato,
        start_date,
        end_date: end_date ?? null,
        tipo_contrato: tipo_contrato.trim(),
        arl: arl.trim(),
        firma_empleado: firma_empleado?.trim(),
        firma_empleador: firma_empleador?.trim(),
        estado: estado?.trim(),
        title: title.trim(),
        vacante: vacante.trim(),
      });

      return res.status(201).json(data);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },

  // Obtener todos
  getAll: async (_req: Request, res: Response) => {
    try {
      const data = await contractService.getAll();
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

      const data = await contractService.getById(id.trim());
      if (!data) return res.status(404).json({ message: "Contrato no encontrado" });

      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },

  // Actualizar contrato
  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      if (!id || typeof id !== "string" || id.trim() === "") {
        return res.status(400).json({ message: "ID inválido" });
      }

      const {
        perfil_creador,
        perfil_empleado,
        eps,
        estrato,
        start_date,
        end_date,
        tipo_contrato,
        arl,
        firma_empleado,
        firma_empleador,
        estado,
        title,
        vacante
      } = req.body;

      const body: any = {};
      if (perfil_creador) body.perfil_creador = perfil_creador.trim();
      if (perfil_empleado) body.perfil_empleado = perfil_empleado.trim();
      if (eps) body.eps = eps.trim();
      if (estrato !== undefined) body.estrato = estrato;
      if (start_date) body.start_date = start_date;
      if (end_date !== undefined) body.end_date = end_date;
      if (tipo_contrato) body.tipo_contrato = tipo_contrato.trim();
      if (arl) body.arl = arl.trim();
      if (firma_empleado) body.firma_empleado = firma_empleado.trim();
      if (firma_empleador) body.firma_empleador = firma_empleador.trim();
      if (estado) body.estado = estado.trim();
      if (title) body.title = title.trim();
      if (vacante) body.vacante = vacante.trim();

      if (Object.keys(body).length === 0) {
        return res.status(400).json({ message: "No hay campos para actualizar" });
      }

      const data = await contractService.update(id.trim(), body);
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },

  // Eliminar contrato
  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      if (!id || typeof id !== "string" || id.trim() === "") {
        return res.status(400).json({ message: "ID inválido" });
      }

      const data = await contractService.delete(id.trim());
      if (!data) return res.status(404).json({ message: "Contrato no encontrado" });

      return res.status(200).json({ message: "Contrato eliminado correctamente" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
};
