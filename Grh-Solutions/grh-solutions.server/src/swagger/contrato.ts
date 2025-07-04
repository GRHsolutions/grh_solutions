import { PathItem, Schema } from "swagger-jsdoc";


export const ContractPaths: PathItem = {
  "/api/contracts/create": {
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
  "/api/contracts/getAll": {
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
  "/api/contracts/getById": {
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
  "/api/contracts/update": {
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
  "/api/contracts/delete": {
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
        "200": { description: "Contrato eliminado" },
        "400": { description: "ID inválido" },
        "404": { description: "Contrato no encontrado" },
      },
    },
  },
};

export const ContractSchema: Schema = {
  type: "object",
  required: ["empleados", "tittle", "description", "content", "type_contract", "status"],
  properties: {
    empleados: {
      type: "string",
      example: "64e8f5e12345678901234567",
    },
    tittle: {
      type: "string",
      example: "Contrato indefinido",
    },
    description: {
      type: "string",
      example: "Contrato para desarrollador senior",
    },
    content: {
      type: "string",
      example: "El contrato incluye todas las cláusulas estipuladas en el acuerdo general entre las partes...",
    },
    type_contract: {
      type: "string",
      example: "64e8f5e12345678901234568",
    },
    status: {
      type: "string",
      example: "activo",
    },
    signatures: {
      type: "string",
      example: "64e8f5e12345678901234569",
    },
  },
};
