import { PathItem, Schema } from "swagger-jsdoc";

export const FollowUpTypePaths: Record<string, PathItem> = {
  "/api/followUpType/create": {
    post: {
      summary: "Crear tipo de seguimiento",
      tags: ["FollowUpType"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/FollowUpType" },
          },
        },
      },
      responses: {
        "201": { description: "Tipo de seguimiento creado exitosamente" },
        "400": { description: "Faltan campos obligatorios" },
        "409": { description: "Ya existe un tipo de seguimiento con ese ID" },
      },
    },
  },
  "/api/followUpType/getAllNoPage": {
    get: {
      summary: "Listar todos los tipos de seguimiento",
      tags: ["FollowUpType"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "name",
          in: "query",
          schema: { type: "string" },
          description: "Filtrar por nombre",
        },
        {
          name: "is_last_update",
          in: "query",
          schema: { type: "boolean" },
          description: "Filtrar por última actualización",
        },
      ],
      responses: {
        "200": { 
          description: "Lista de tipos de seguimiento",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/FollowUpType" },
              },
            },
          },
        },
        "500": { description: "Error del servidor" },
      },
    },
  },
  "/api/followUpType/getById": {
    get: {
      summary: "Obtener tipo de seguimiento por ID",
      tags: ["FollowUpType"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del tipo de seguimiento",
        },
      ],
      responses: {
        "200": { description: "Tipo de seguimiento encontrado" },
        "400": { description: "ID inválido" },
        "404": { description: "Tipo de seguimiento no encontrado" },
      },
    },
  },
  "/api/followUpType/update": {
    put: {
      summary: "Actualizar tipo de seguimiento",
      tags: ["FollowUpType"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del tipo de seguimiento a actualizar",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/FollowUpType" },
          },
        },
      },
      responses: {
        "200": { description: "Tipo de seguimiento actualizado correctamente" },
        "400": { description: "Datos inválidos" },
        "404": { description: "Tipo de seguimiento no encontrado" },
      },
    },
  },
  "/api/followUpType/delete": {
    delete: {
      summary: "Eliminar tipo de seguimiento",
      tags: ["FollowUpType"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del tipo de seguimiento a eliminar",
        },
      ],
      responses: {
        "200": { description: "Tipo de seguimiento eliminado correctamente" },
        "400": { description: "ID inválido" },
        "404": { description: "Tipo de seguimiento no encontrado" },
      },
    },
  },
};

export const FollowUpTypeSchema: { schemas: Record<string, Schema> } = {
  schemas: {
    FollowUpType: {
      type: "object",
      required: ["id_type_follow_up", "name"],
      properties: {
        id_type_follow_up: {
          type: "string",
          example: "FUT001",
          description: "Identificador único del tipo de seguimiento",
        },
        name: {
          type: "string",
          example: "Seguimiento médico",
          description: "Nombre del tipo de seguimiento",
        },
        is_last_update: {
          type: "boolean",
          example: false,
          description: "Indica si es la última actualización",
          default: false,
        },
        createdAt: {
          type: "string",
          format: "date-time",
          example: "2025-01-15T10:30:00.000Z",
          description: "Fecha de creación",
        },
        updatedAt: {
          type: "string",
          format: "date-time",
          example: "2025-01-15T10:30:00.000Z",
          description: "Fecha de última actualización",
        },
      },
    },
  },
};