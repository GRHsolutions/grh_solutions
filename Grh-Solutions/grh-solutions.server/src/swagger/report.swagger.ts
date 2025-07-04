import { PathItem, Schema } from "swagger-jsdoc";

export const ReportPaths: PathItem = {
  "/api/report/create": {
    post: {
      summary: "Crear reporte",
      tags: ["Report"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Report" },
          },
        },
      },
      responses: {
        "201": { description: "Reporte creado exitosamente" },
        "400": { description: "Faltan campos obligatorios" },
      },
    },
  },
  "/api/report/getAll": {
    get: {
      summary: "Listar todos los reportes",
      tags: ["Report"],
      security: [{ bearerAuth: [] }],
      responses: {
        "200": { description: "Lista de reportes" },
        "500": { description: "Error del servidor" },
      },
    },
  },
  "/api/report/getById": {
    get: {
      summary: "Obtener reporte por ID",
      tags: ["Report"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del reporte",
        },
      ],
      responses: {
        "200": { description: "Reporte encontrado" },
        "400": { description: "ID inválido" },
        "404": { description: "Reporte no encontrado" },
      },
    },
  },
  "/api/report/update": {
    put: {
      summary: "Actualizar reporte",
      tags: ["Report"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del reporte a actualizar",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Report" },
          },
        },
      },
      responses: {
        "200": { description: "Reporte actualizado" },
        "400": { description: "Datos inválidos" },
      },
    },
  },
  "/api/report/delete": {
    delete: {
      summary: "Eliminar reporte",
      tags: ["Report"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del reporte a eliminar",
        },
      ],
      responses: {
        "200": { description: "Reporte eliminado" },
        "400": { description: "ID inválido" },
        "404": { description: "Reporte no encontrado" },
      },
    },
  },
};

export const ReportSchema: Schema = {
  type: "object",
  required: ["title", "descripcion", "fk_solicitud", "fk_user"],
  properties: {
    title: {
      type: "string",
      example: "Informe de progreso del proyecto",
    },
    descripcion: {
      type: "string",
      example:
        "Este informe detalla el avance de la fase inicial del desarrollo.",
    },
    fk_solicitud: {
      type: "string",
      example: "64efb1d45a75c87ab0123456",
    },
    fk_user: {
      type: "string",
      example: "64efa7e39d6c23dcb0987654",
    },
  },
};
