import { PathItem, Schema } from "swagger-jsdoc";

export const HistoryPaths: Record<string, PathItem> = {
  "/api/history/create": {
    post: {
      summary: "Crear registro de historial",
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
        "201": { description: "Registro de historial creado exitosamente" },
        "400": { description: "Faltan campos obligatorios" },
        "409": { description: "Ya existe un registro con ese ID" },
      },
    },
  },
  "/api/history/getAllNoPage": {
    get: {
      summary: "Listar todos los registros de historial",
      tags: ["History"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "user_fk",
          in: "query",
          schema: { type: "string" },
          description: "Filtrar por ID de usuario",
        },
        {
          name: "event",
          in: "query",
          schema: { type: "string" },
          description: "Filtrar por evento",
        },
        {
          name: "startDate",
          in: "query",
          schema: { type: "string", format: "date" },
          description: "Fecha de inicio para filtrar registros",
        },
        {
          name: "endDate",
          in: "query",
          schema: { type: "string", format: "date" },
          description: "Fecha de fin para filtrar registros",
        },
        {
          name: "limit",
          in: "query",
          schema: { type: "integer", minimum: 1, maximum: 100 },
          description: "Número máximo de registros a devolver",
        },
        {
          name: "page",
          in: "query",
          schema: { type: "integer", minimum: 1 },
          description: "Número de página para paginación",
        },
      ],
      responses: {
        "200": { 
          description: "Lista de registros de historial",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: { $ref: "#/components/schemas/History" },
                  },
                  pagination: {
                    type: "object",
                    properties: {
                      total: { type: "integer" },
                      page: { type: "integer" },
                      limit: { type: "integer" },
                      totalPages: { type: "integer" },
                    },
                  },
                },
              },
            },
          },
        },
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
        "404": { description: "Registro de historial no encontrado" },
      },
    },
  },
  "/api/history/delete": {
    delete: {
      summary: "Eliminar registro de historial",
      tags: ["History"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del registro de historial a eliminar",
        },
      ],
      responses: {
        "200": { description: "Registro de historial eliminado correctamente" },
        "400": { description: "ID inválido" },
        "404": { description: "Registro de historial no encontrado" },
      },
    },
  },
};

export const HistorySchema: { schemas: Record<string, Schema> } = {
  schemas: {
    History: {
      type: "object",
      required: ["id_history", "event", "user_fk"],
      properties: {
        id_history: {
          type: "string",
          example: "HIST001",
          description: "Identificador único del registro de historial",
        },
        event: {
          type: "string",
          example: "Usuario creó un nuevo contrato",
          description: "Descripción del evento registrado",
        },
        user_fk: {
          type: "string",
          example: "64efa7e39d6c23dcb0987654",
          description: "ID del usuario que realizó la acción",
        },
        created_at: {
          type: "string",
          format: "date-time",
          example: "2025-01-15T10:30:00.000Z",
          description: "Fecha de creación del registro",
        },
        updated_at: {
          type: "string",
          format: "date-time",
          example: "2025-01-15T10:30:00.000Z",
          description: "Fecha de última actualización del registro",
        },
      },
    },
  },
};