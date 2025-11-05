import { PathItem, Schema } from "swagger-jsdoc";

export const ContractPaths: Record<string, PathItem> = {
  "/api/contract/create": {
    post: {
      summary: "Crear contrato",
      tags: ["Contract"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Contract" },
          },
        },
      },
      responses: {
        "201": { description: "Contrato creado exitosamente" },
        "400": { description: "Faltan campos obligatorios" },
      },
    },
  },

  "/api/contract/getAll": {
    get: {
      summary: "Listar todos los contratos",
      tags: ["Contract"],
      security: [{ bearerAuth: [] }],
      responses: {
        "200": { description: "Lista de contratos" },
        "500": { description: "Error del servidor" },
      },
    },
  },

  "/api/contract/getById": {
    get: {
      summary: "Obtener contrato por ID",
      tags: ["Contract"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del contrato",
        },
      ],
      responses: {
        "200": { description: "Contrato encontrado" },
        "400": { description: "ID inválido" },
        "404": { description: "Contrato no encontrado" },
      },
    },
  },

  "/api/contract/update": {
    put: {
      summary: "Actualizar contrato",
      tags: ["Contract"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del contrato a actualizar",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Contract" },
          },
        },
      },
      responses: {
        "200": { description: "Contrato actualizado" },
        "400": { description: "Datos inválidos" },
      },
    },
  },

  "/api/contract/delete": {
    delete: {
      summary: "Eliminar contrato",
      tags: ["Contract"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del contrato a eliminar",
        },
      ],
      responses: {
        "200": { description: "Contrato eliminado correctamente" },
        "400": { description: "ID inválido" },
        "404": { description: "Contrato no encontrado" },
      },
    },
  },
};

export const ContractSchema: { schemas: Record<string, Schema> } = {
  schemas: {
    Contract: {
      type: "object",
      required: [
        "perfil_creador",
        "perfil_empleado",
        "eps",
        "estrato",
        "start_date",
        "tipo_contrato",
        "arl",
        "title",
        "vacante",
      ],
      properties: {
        perfil_creador: {
          type: "string",
          example: "686c4e565d285a66d56ba4bd",
          description: "ID del perfil que crea el contrato",
        },
        perfil_empleado: {
          type: "string",
          example: "686d6063de898a945328f4d0",
          description: "ID del perfil del empleado contratado",
        },
        eps: {
          type: "string",
          example: "Nueva EPS",
        },
        estrato: {
          type: "number",
          example: 3,
        },
        start_date: {
          type: "string",
          format: "date",
          example: "2025-02-01",
        },
        end_date: {
          type: "string",
          format: "date",
          nullable: true,
          example: null,
        },
        tipo_contrato: {
          type: "string",
          example: "690b0c33c2cf7e8ce75dc141",
        },
        arl: {
          type: "string",
          example: "Sura",
        },
        firma_empleado: {
          type: "string",
          example: "data:image/png;base64,iVBORw0K...",
        },
        firma_empleador: {
          type: "string",
          example: "data:image/png;base64,iVBORw0K...",
        },
        estado: {
          type: "string",
          example: "activo",
        },
        title: {
          type: "string",
          example: "Contrato a término indefinido",
        },
        vacante: {
          type: "string",
          example: "686301bec27c61a5e06bec24",
        },
      },
    },
  },
};
