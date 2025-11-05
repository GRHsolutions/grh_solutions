import { PathItem, Schema } from "swagger-jsdoc";

export const ModulePaths: Record<string, PathItem> = {
  "/api/modules/create": {
    post: {
      summary: "Crear un módulo",
      tags: ["Module"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Module" },
          },
        },
      },
      responses: {
        "201": { description: "Módulo creado exitosamente" },
        "400": { description: "Datos inválidos o faltantes" },
        "409": { description: "Módulo con ese nombre ya existe" },
      },
    },
  },
  "/api/modules/getAll": {
    get: {
      summary: "Listar todos los módulos",
      tags: ["Module"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "name",
          in: "query",
          schema: { type: "string" },
          description: "Buscar por nombre",
        },
        {
          name: "includeDisabled",
          in: "query",
          schema: { type: "boolean" },
          description: "Incluir módulos deshabilitados",
        },
      ],
      responses: {
        "200": { description: "Lista de módulos" },
        "500": { description: "Error del servidor" },
      },
    },
  },
  "/api/modules/getById": {
    get: {
      summary: "Obtener módulo por ID",
      tags: ["Module"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del módulo",
        },
      ],
      responses: {
        "200": { description: "Módulo encontrado" },
        "400": { description: "ID inválido" },
        "404": { description: "Módulo no encontrado" },
      },
    },
  },
  "/api/modules/update": {
    put: {
      summary: "Actualizar módulo",
      tags: ["Module"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del módulo a actualizar",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Module" },
          },
        },
      },
      responses: {
        "200": { description: "Módulo actualizado correctamente" },
        "400": { description: "Datos inválidos" },
        "404": { description: "Módulo no encontrado" },
      },
    },
  },
  "/api/modules/delete": {
    delete: {
      summary: "Eliminar (deshabilitar) módulo",
      tags: ["Module"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del módulo a eliminar",
        },
      ],
      responses: {
        "200": { description: "Módulo deshabilitado correctamente" },
        "400": { description: "ID inválido" },
        "404": { description: "Módulo no encontrado" },
      },
    },
  },
};
export const ModuleSchema: Schema = {
  type: "object",
  required: ["name"],
  properties: {
    name: {
      type: "string",
      example: "Gestión de usuarios",
    },
    description: {
      type: "string",
      example: "Este módulo permite gestionar los usuarios del sistema.",
    },
    disabled: {
      type: "boolean",
      example: false,
    },
  },
};
