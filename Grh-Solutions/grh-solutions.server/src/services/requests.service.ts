import mongoose from "mongoose";
import { RequestModel } from "../models/requests.model";
import { requestTypeFilter } from "../filters/requests.filter";
import { historyService } from "./history.service";

type RequestUpdateDto = {
  title?: string;
  status?: string;
  type_request?: string;
  infoDx?: string;
};

export const requestsService = {
  // Crear solicitud
  create: (data: object) => RequestModel.create(data),

  // Obtener todas con filtros
  getAll: (filter: requestTypeFilter) => {
    const query: any = {};

    if (filter.title) query.title = new RegExp(filter.title, "i");
    if (filter.status) query.status = filter.status;
    if (filter.type_request) query.type_request = filter.type_request;

    return RequestModel.find(query).populate("createdBy", "-password");
  },

  // Obtener por ID
  getById: (id: string) =>
    RequestModel.findById(id).populate("createdBy", "-password"),

  // Actualizar solicitud y registrar historial
  update: async (id: string, body: RequestUpdateDto, profileId: string) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        console.warn("[requestsService.update] ID no válido:", id);
        return null;
      }

      const existingRequest = await RequestModel.findById(id).lean();
      if (!existingRequest) {
        console.warn("[requestsService.update] No existe request:", id);
        return null;
      }

      const allowedFields: Partial<RequestUpdateDto> = {};
      (["title", "status", "type_request", "infoDx"] as (keyof RequestUpdateDto)[]).forEach(
        (key) => {
          if ((body as any)[key] !== undefined) {
            allowedFields[key] = (body as any)[key];
          }
        }
      );

      if (Object.keys(allowedFields).length === 0) {
        console.info("[requestsService.update] No hay campos permitidos para actualizar");
        return existingRequest;
      }

      const updatedRequest = await RequestModel.findByIdAndUpdate(
        id,
        allowedFields,
        { new: true }
      ).lean();

      if (updatedRequest) {
        const changes: string[] = [];
        for (const key of Object.keys(allowedFields)) {
          const oldVal = (existingRequest as any)[key];
          const newVal = (updatedRequest as any)[key];
          if (String(oldVal) !== String(newVal)) {
            changes.push(`${key}: "${oldVal}" → "${newVal}"`);
          }
        }

        if (changes.length > 0) {
          const description = `Se modificó la solicitud. Cambios: ${changes.join(", ")}`;
          try {
            const hist = await historyService.create({
              requestId: id,
              profileId,
              description,
            });
            console.log("[requestsService.update] History creado:", hist._id?.toString());
          } catch (err) {
            console.error("[requestsService.update] Error al crear historial:", err);
          }
        } else {
          console.log("[requestsService.update] No se detectaron cambios reales");
        }
      }

      return updatedRequest;
    } catch (err) {
      console.error("[requestsService.update] ERROR:", err);
      throw err;
    }
  },

  // Eliminado lógico
  delete: async (id: string, profileId: string) => {
    const deletedRequest = await RequestModel.findByIdAndUpdate(
      id,
      { status: "eliminada" },
      { new: true }
    );

    if (deletedRequest) {
      try {
        await historyService.create({
          requestId: id,
          profileId,
          description: "Se eliminó la solicitud (baja lógica)",
        });
        console.log("[requestsService.delete] History registrado");
      } catch (err) {
        console.error("[requestsService.delete] Error al crear historial:", err);
      }
    }

    return deletedRequest;
  },
};
