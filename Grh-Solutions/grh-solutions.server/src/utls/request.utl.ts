import mongoose from "mongoose";
import { historyModel } from "../models/history.model";

export const RequestUtil = {
  generateHistory: async (
    comm: string,
    idRqst: string | mongoose.Types.ObjectId,
    by: string
  ) => {
    // Genera el historial de acuerdo a un cambio en x solicitud, recibe el texto, el objeto quien se le hizo el cambio, y el id de quien lo hizo

    // Validar si el ID de la solicitud es válido
    if (!mongoose.Types.ObjectId.isValid(idRqst)) {
      console.warn("[requestsService.update] ID no válido:", idRqst);
      throw new Error(
        "[requestsService.update] ID de solicitud no válido: " + idRqst
      );
    }

    // Crear el historial de manera asíncrona, asegurándose de esperar su resolución
    const created = await historyModel.create({
      requestId: idRqst,
      profileId: by,
      description: comm,
    });

    // Retornar el historial creado
    return created;
  },
};
