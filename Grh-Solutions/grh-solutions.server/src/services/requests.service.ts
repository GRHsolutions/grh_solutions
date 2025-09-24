import mongoose from "mongoose";
import { RequestModel } from "../models/requests.model";
import { requestTypeFilter } from "../filters/requests.filter";
import { historyService } from "./history.service";
import { RequestUtil } from "../utls/request.utl";

type RequestUpdateDto = {
  title?: string;
  status?: string;
  type_request?: string;
  infoDx?: string;
};

export const requestsService = {
  // Crear solicitud
  create: async (data: object, by: string) => {
    // Esperar la resolución de la promesa
    const createdObject = await RequestModel.create(data);

    if (createdObject._id) {
      // Si se ha creado el objeto correctamente, generamos el historial
      await RequestUtil.generateHistory(
        "Se ha creado la solicitud",
        createdObject._id,
        by
      );
    }

    return createdObject;
  },

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
      (
        [
          "title",
          "status",
          "type_request",
          "infoDx",
        ] as (keyof RequestUpdateDto)[]
      ).forEach((key) => {
        if ((body as any)[key] !== undefined) {
          allowedFields[key] = (body as any)[key];
        }
      });

      if (Object.keys(allowedFields).length === 0) {
        console.info(
          "[requestsService.update] No hay campos permitidos para actualizar"
        );
        return existingRequest;
      }

      const updatedRequest = await RequestModel.findByIdAndUpdate(
        id,
        allowedFields,
        { new: true }
      ).lean();

      if (updatedRequest) {
        await RequestUtil.generateHistory(
          "Se ha actualizado la solicitud",
          id,
          profileId
        );
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
        await RequestUtil.generateHistory(
          "Se ha eliminado la solicitud",
          id,
          profileId
        );

        console.log("[requestsService.delete] History registrado");
      } catch (err) {
        console.error(
          "[requestsService.delete] Error al crear historial:",
          err
        );
      }
    }

    return deletedRequest;
  },
};
