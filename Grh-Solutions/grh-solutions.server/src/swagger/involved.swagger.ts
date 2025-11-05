import { PathItem, Schema } from "swagger-jsdoc";

export const InvolvedPaths: Record<string, PathItem> = {
  "/api/involved/create": {
    post: {
      summary: "Crear relación de involucrado",
      tags: ["Involved"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Involved" },
          },
        },
      },
      responses: {
        "201": { description: "Involucrado creado exitosamente" },
        "400": { description: "Faltan campos obligatorios" },
        "500": { description: "Error del servidor" },
      },
    },
  },

  "/api/involved/getAll": {
    get: {
      summary: "Listar todos los involucrados",
      tags: ["Involved"],
      security: [{ bearerAuth: [] }],
      responses: {
        "200": {
          description: "Lista de involucrados",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Involved" },
              },
            },
          },
        },
        "500": { description: "Error del servidor" },
      },
    },
  },

  "/api/involved/getById": {
    get: {
      summary: "Obtener involucrado por ID",
      tags: ["Involved"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del involucrado",
        },
      ],
      responses: {
        "200": { description: "Involucrado encontrado" },
        "400": { description: "ID inválido" },
        "404": { description: "Involucrado no encontrado" },
      },
    },
  },

  "/api/involved/getByRequestId": {
    get: {
      summary: "Obtener involucrados por solicitud",
      tags: ["Involved"],
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
          description: "Lista de involucrados de la solicitud",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Involved" },
              },
            },
          },
        },
        "400": { description: "ID inválido" },
        "404": { description: "No se encontraron involucrados" },
      },
    },
  },

  "/api/involved/update": {
    put: {
      summary: "Actualizar involucrado por ID",
      tags: ["Involved"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del involucrado a actualizar",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Involved" },
          },
        },
      },
      responses: {
        "200": { description: "Involucrado actualizado" },
        "400": { description: "Datos inválidos" },
      },
    },
  },

  "/api/involved/delete": {
    delete: {
      summary: "Eliminar involucrado por ID",
      tags: ["Involved"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del involucrado a eliminar",
        },
      ],
      responses: {
        "200": { description: "Involucrado eliminado correctamente" },
        "400": { description: "ID inválido" },
        "404": { description: "Involucrado no encontrado" },
      },
    },
  },
};

export const InvolvedSchema: Schema = {
  type: "object",
  required: ["requestId", "profileId", "role"],
  properties: {
    requestId: {
      type: "string",
      example: "64efa7e39d6c23dcb0987654",
      description: "ID de la solicitud relacionada",
    },
    profileId: {
      type: "string",
      example: "64efa7e39d6c23dcb0123456",
      description: "ID del perfil involucrado",
    },
    assignedBy: {
      type: "string",
      example: "64efa7e39d6c23dcb0654321",
      description: "ID del perfil que asignó a este involucrado",
    },
    role: {
      type: "string",
      enum: ["editor", "reader"],
      example: "editor",
      description: "Rol del involucrado en la solicitud",
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


export const InvolvedSchemas = {
  Involved: InvolvedSchema,
};
