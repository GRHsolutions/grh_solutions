import { PathItem, Schema } from "swagger-jsdoc";

export const HistoryPaths: Record<string, PathItem> = {
  "/api/history/getByRequestId": {
    get: {
      summary: "Obtener historial de una solicitud",
      tags: ["History"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "requestId",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID de la solicitud",
        },
      ],
      responses: {
        "200": {
          description: "Lista de registros de historial",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/History" },
              },
            },
          },
        },
        "400": { description: "requestId inválido" },
        "500": { description: "Error del servidor" },
      },
    },
  },

  "/api/history/getById": {
    get: {
      summary: "Obtener registro de historial por ID",
      tags: ["History"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del registro de historial",
        },
      ],
      responses: {
        "200": { description: "Registro de historial encontrado" },
        "400": { description: "ID inválido" },
        "404": { description: "Historial no encontrado" },
        "500": { description: "Error del servidor" },
      },
    },
  },
};

export const HistorySchema: Schema = {
  type: "object",
  required: ["requestId", "profileId", "description"],
  properties: {
    requestId: {
      type: "string",
      example: "64efa7e39d6c23dcb0987654",
      description: "ID de la solicitud relacionada",
    },
    profileId: {
      type: "string",
      example: "64efa7e39d6c23dcb0123456",
      description: "ID del usuario que realizó el cambio",
    },
    description: {
      type: "string",
      example: "Se cambió el estado de 'pendiente' a 'aprobada'",
      description: "Descripción del cambio realizado",
    },
    createdAt: {
      type: "string",
      format: "date-time",
      example: "2025-07-04T12:00:00.000Z",
      description: "Fecha en que se registró el cambio",
    },
  },
};

export const HistorySchemas = {
  History: HistorySchema,
};
