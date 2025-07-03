import { Response, Request } from "express";
import { contractService } from "../services/contract.service";

export const contractController = {
  // Crear contrato
  create: async (req: Request, res: Response) => {
    try {
      const { empleados, tittle, description, content, type_contract, status, signatures } = req.body;

      if (!empleados || !tittle || !description || !content || !type_contract || !status) {
        return res.status(400).json({ message: "Faltan campos obligatorios" });
      }

      const data = await contractService.create({
        empleados: empleados.trim(),
        tittle: tittle.trim(),
        description: description.trim(),
        content: content.trim(),
        type_contract: type_contract.trim(),
        status: status.trim(),
        signatures: signatures?.trim(),
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

  // Actualizar
  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      const { empleados, tittle, description, content, type_contract, status, signatures } = req.body;

      if (!id || typeof id !== "string" || id.trim() === "") {
        return res.status(400).json({ message: "ID inválido" });
      }

      const body: any = {};
      if (empleados) body.empleados = empleados.trim();
      if (tittle) body.tittle = tittle.trim();
      if (description) body.description = description.trim();
      if (content) body.content = content.trim();
      if (type_contract) body.type_contract = type_contract.trim();
      if (status) body.status = status.trim();
      if (signatures) body.signatures = signatures.trim();

      if (Object.keys(body).length === 0) {
        return res.status(400).json({ message: "No hay campos para actualizar" });
      }

      const data = await contractService.update(id.trim(), body);
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

      const data = await contractService.delete(id.trim());
      if (!data) return res.status(404).json({ message: "Contrato no encontrado" });

      return res.status(200).json({ message: "Contrato eliminado correctamente" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
};
