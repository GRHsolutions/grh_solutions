import { PathItem, Schema } from "swagger-jsdoc";

export const RequestPaths: Record<string, PathItem> = {
  "/api/request/create": {
    post: {
      summary: "Crear solicitud",
      tags: ["Request"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Request" },
          },
        },
      },
      responses: {
        "201": { description: "Solicitud creada exitosamente" },
        "400": { description: "Faltan campos obligatorios" },
      },
    },
  },

  "/api/request/getAll": {
    get: {
      summary: "Listar todas las solicitudes (con filtros opcionales)",
      tags: ["Request"],
      security: [{ bearerAuth: [] }],
      responses: {
        "200": {
          description: "Lista de solicitudes",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Request" },
              },
            },
          },
        },
        "500": { description: "Error del servidor" },
      },
    },
  },

  "/api/request/getById": {
    get: {
      summary: "Obtener solicitud por ID",
      tags: ["Request"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID de la solicitud",
        },
      ],
      responses: {
        "200": { description: "Solicitud encontrada" },
        "400": { description: "ID inválido" },
        "404": { description: "Solicitud no encontrada" },
      },
    },
  },

  "/api/request/update": {
    put: {
      summary: "Actualizar solicitud por ID",
      tags: ["Request"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID de la solicitud a actualizar",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Request" },
          },
        },
      },
      responses: {
        "200": { description: "Solicitud actualizada" },
        "400": { description: "Datos inválidos" },
      },
    },
  },

  "/api/request/delete": {
    delete: {
      summary: "Desactivar solicitud (cambio de estado)",
      tags: ["Request"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID de la solicitud a desactivar",
        },
      ],
      responses: {
        "200": { description: "Solicitud desactivada correctamente" },
        "400": { description: "ID inválido" },
        "404": { description: "Solicitud no encontrada" },
      },
    },
  },
};

export const RequestSchema: Schema = {
  type: "object",
  required: ["createdBy", "title", "status", "type_request"],
  properties: {
    createdBy: {
      type: "string",
      example: "64efa7e39d6c23dcb0987654",
      description: "ID del usuario que crea la solicitud",
    },
    title: {
      type: "string",
      example: "Solicitud de vacaciones",
    },
    status: {
      type: "string",
      enum: ["pendiente", "aprobada", "rechazada"],
      example: "pendiente",
    },
    type_request: {
      type: "string",
      example: "Vacaciones",
    },
    infoDx: {
      type: "string",
      example: "Detalle o diagnóstico de la solicitud (opcional)",
    },
    createdAt: {
      type: "string",
      format: "date-time",
      example: "2025-07-04T12:00:00.000Z",
    },
    updatedAt: {
      type: "string",
      format: "date-time",
      example: "2025-07-04T12:00:00.000Z",
    },
  },
};