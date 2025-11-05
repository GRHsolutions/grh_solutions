import { PathItem, Schema } from "swagger-jsdoc";

export const HistoryPaths: Record<string, PathItem> = {
  "/api/history": {
    post: {
      summary: "Crear un registro en el historial",
      tags: ["History"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/History" },
          },
        },
      },
      responses: {
        "201": {
          description: "Registro de historial creado exitosamente",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/History" },
            },
          },
        },
        "400": { description: "Faltan datos requeridos o inválidos" },
        "500": { description: "Error del servidor" },
      },
    },
  },

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
        "200": {
          description: "Registro de historial encontrado",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/History" },
            },
          },
        },
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
    requestId: { type: "string", example: "64efa7e39d6c23dcb0987654" },
    profileId: { type: "string", example: "64efa7e39d6c23dcb0123456" },
    description: { type: "string", example: "Se cambió el estado de 'pendiente' a 'aprobada'" },
    createdAt: { type: "string", format: "date-time", example: "2025-07-04T12:00:00.000Z" },
  },
  example: {
    requestId: "64efa7e39d6c23dcb0987654",
    profileId: "64efa7e39d6c23dcb0123456",
    description: "Se cambió el estado de 'pendiente' a 'aprobada'",
    createdAt: "2025-07-04T12:00:00.000Z",
  },
};
