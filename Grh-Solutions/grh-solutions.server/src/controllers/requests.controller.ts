// controllers/requests.controller.ts
import { Request, Response } from "express";
import mongoose from "mongoose";
import { requestsService } from "../services/requests.service";
import { requestTypeFilter } from "../filters/requests.filter";
import { historyService } from "../services/history.service";
import { profileService } from "../services/profile.service";
import { involvedService } from "../services/involved.service";

export const requestsController = {
  create: async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;
      const { title, type_request, infoDx, file, createdAt } = req.body;

      if (!userId) return res.status(401).json({ message: "Token inválido" });
      if (!title) return res.status(400).json({ message: "Título requerido" });
      if (!type_request)
        return res.status(400).json({ message: "Tipo requerido" });
      const newReq = await requestsService.create(
        {
          title,
          status: "pendiente",
          type_request,
          infoDx,
          file,
          ...(createdAt && { createdAt: new Date(createdAt) }), 
        },
        userId
      );

      // 2) Obtener perfil del usuario creador
      const profile = await profileService.getByUserId(userId);

      if (profile) {
        // 3) Crear registro en history (solo la acción)
        await historyService.create({
          requestId: new mongoose.Types.ObjectId(newReq._id),
          profileId: new mongoose.Types.ObjectId(profile._id),
          description: "Se creó la solicitud",
        });

        // 4) Registrar en involved al creador como "peticionante"
        await involvedService.create({
          requestId: new mongoose.Types.ObjectId(newReq._id),
          profileId: new mongoose.Types.ObjectId(profile._id),
          assignedBy: new mongoose.Types.ObjectId(profile._id),
          role: "peticionante",
        });
      }

      return res.status(201).json(newReq);
    } catch (e: any) {
      console.error("[requestsController.create] ERROR:", e);
      return res.status(500).json({ message: e?.message ?? "Error interno" });
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const filtros = req.query as unknown as requestTypeFilter;
      const data = await requestsService.getAll(filtros);
      return res.status(200).json(data);
    } catch (e: any) {
      console.error("[requestsController.getAll] ERROR:", e);
      return res.status(500).json({ message: e?.message ?? "Error interno" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      if (!id || typeof id !== "string")
        return res.status(400).json({ message: "ID requerido" });

      const data = await requestsService.getById(id);
      if (!data) return res.status(404).json({ message: "No encontrada" });

      return res.status(200).json(data);
    } catch (e: any) {
      console.error("[requestsController.getById] ERROR:", e);
      return res.status(500).json({ message: e?.message ?? "Error interno" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;
      const { id } = req.query;
      if (!id || typeof id !== "string")
        return res.status(400).json({ message: "ID requerido" });
      if (!userId) return res.status(401).json({ message: "Token inválido" });

      // 1) Obtener la solicitud antes de actualizar para detectar diferencias
      const oldRequest = await requestsService.getById(id);
      if (!oldRequest)
        return res.status(404).json({ message: "Solicitud no encontrada" });

      // 2) Preparar y ejecutar actualización
      const { title, status, type_request, infoDx, file } = req.body;
      const body: any = { title, status, type_request, infoDx };
      if (file !== undefined) body.file = file;

      const updated = await requestsService.update(id, body);
      if (!updated)
        return res.status(404).json({ message: "Solicitud no encontrada" });

      // 3) Obtener perfil del usuario que hace el cambio
      const profile = await profileService.getByUserId(userId);

      // 4) Detectar cambios (comparando oldRequest vs nuevos valores)
      const changes: string[] = [];

      if (status !== undefined && oldRequest.status !== status) {
        changes.push(
          `Se cambió el estado de '${oldRequest.status}' a '${status}'`
        );
      }
      if (title !== undefined && (oldRequest.title ?? "") !== (title ?? "")) {
        changes.push(
          `Se cambió el título de '${oldRequest.title ?? ""}' a '${title}'`
        );
      }
      if (
        type_request !== undefined &&
        (oldRequest.type_request ?? "") !== (type_request ?? "")
      ) {
        changes.push(
          `Se cambió el tipo de '${
            oldRequest.type_request ?? ""
          }' a '${type_request}'`
        );
      }
      if (
        infoDx !== undefined &&
        (oldRequest.infoDx ?? "") !== (infoDx ?? "")
      ) {
        changes.push(
          `Se cambió la infoDx de '${oldRequest.infoDx ?? ""}' a '${infoDx}'`
        );
      }
      // Comparación simple de archivos (si los envías como array)
      if (file !== undefined) {
        const oldFileStr = JSON.stringify(oldRequest.file ?? []);
        const newFileStr = JSON.stringify(file ?? []);
        if (oldFileStr !== newFileStr) {
          changes.push(`Se actualizaron los archivos adjuntos`);
        }
      }

      // 5) Guardar en historial (solo la descripción con los cambios)
      if (changes.length > 0 && profile) {
        await historyService.create({
          requestId: new mongoose.Types.ObjectId(id),
          profileId: new mongoose.Types.ObjectId(profile._id),
          description: changes.join("\n"),
        });
      }

      return res.status(200).json(updated);
    } catch (e: any) {
      console.error("[requestsController.update] ERROR:", e);
      return res.status(500).json({ message: e?.message ?? "Error interno" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      if (!id || typeof id !== "string")
        return res.status(400).json({ message: "ID requerido" });

      const deleted = await requestsService.delete(id);
      if (!deleted)
        return res.status(404).json({ message: "Solicitud no encontrada" });

      return res.status(200).json({ message: "Solicitud desactivada" });
    } catch (e: any) {
      console.error("[requestsController.delete] ERROR:", e);
      return res.status(500).json({ message: e?.message ?? "Error interno" });
    }
  },
};
