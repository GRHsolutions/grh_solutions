import { PathItem, Schema } from "swagger-jsdoc";

export const permissionPaths: Record<string, PathItem> = {
  "/api/permission/getPermissions": {
    post: {
      summary: "Verificar permisos de un rol sobre una lista de endpoints",
      description:
        "Recibe un rol actual y un listado de objetos `ident` (método y URL), y devuelve si el rol tiene acceso o no. También considera si el módulo asociado al permiso está desactivado.",
      tags: ["Permission"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/CheckPermissionsRequest" },
          },
        },
      },
      responses: {
        "200": {
          description: "Resultado de verificación de permisos",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CheckPermissionsResponse" },
            },
          },
        },
        "400": {
          description: "Solicitud inválida o faltan datos requeridos",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/BadRequestError" },
            },
          },
        },
        "403": {
          description: "Acceso denegado (módulo deshabilitado)",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ForbiddenError" },
            },
          },
        },
        "500": {
          description: "Error interno del servidor",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ServerError" },
            },
          },
        },
      },
    },
  },
};

export const permissionSchemas: { schemas: Record<string, Schema> } = {
  schemas: {
    Ident: {
      type: "object",
      properties: {
        method: {
          type: "string",
          enum: ["GET", "POST", "PUT", "DELETE", "PATCH"],
          example: "GET",
        },
        originalUrl: {
          type: "string",
          example: "/api/users",
        },
      },
      required: ["method", "originalUrl"],
    },
    CheckPermissionsRequest: {
      type: "object",
      properties: {
        idents: {
          type: "array",
          items: { $ref: "#/components/schemas/Ident" },
          example: [
            { method: "GET", originalUrl: "/api/users" },
            { method: "POST", originalUrl: "/api/users" },
          ],
        },
      },
      required: ["idents"],
    },
    CheckPermissionResult: {
      type: "object",
      properties: {
        ident: { $ref: "#/components/schemas/Ident" },
        granted: {
          type: "boolean",
          description:
            "Indica si el rol tiene acceso (true) o no (false) al recurso especificado",
          example: true,
        },
      },
    },
    CheckPermissionsResponse: {
      type: "object",
      properties: {
        success: { type: "boolean", example: true },
        permissions: {
          type: "array",
          description: "Listado de permisos evaluados",
          items: { $ref: "#/components/schemas/CheckPermissionResult" },
        },
      },
      example: {
        success: true,
        permissions: [
          {
            ident: { method: "GET", originalUrl: "/api/users" },
            granted: true,
          },
          {
            ident: { method: "POST", originalUrl: "/api/users" },
            granted: false,
          },
        ],
      },
    },
    BadRequestError: {
      type: "object",
      properties: {
        success: { type: "boolean", example: false },
        message: { type: "string", example: "El body de la solicitud es null" },
      },
    },
    ForbiddenError: {
      type: "object",
      properties: {
        success: { type: "boolean", example: false },
        message: {
          type: "string",
          example: "El módulo que intentas ingresar está desactivado.",
        },
        module: { type: "string", example: "Usuarios" },
      },
    },
    ServerError: {
      type: "object",
      properties: {
        success: { type: "boolean", example: false },
        message: {
          type: "string",
          example: "Error al obtener los usuarios",
        },
        error: { type: "string", example: "TypeError: Cannot read property 'x' of undefined" },
      },
    },
  },
};
