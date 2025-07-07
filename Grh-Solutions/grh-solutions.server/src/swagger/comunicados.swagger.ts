import { PathItem, Schema } from "swagger-jsdoc";

export const newPaths: Record<string, PathItem> = {
  //--------news-------------------
  "/api/news/": {
    get: {
      summary: "Obtener todos los comunicados (con filtros opcionales)",
      tags: ["News"],
      parameters: [
        {
          name: "search",
          in: "query",
          required: false,
          schema: { type: "string" },
          description: "ID del grupo para filtrar",
        },
        {
          name: "currentPage",
          in: "query",
          required: false,
          schema: { type: "integer", minimum: 1 },
          description: "Página actual para paginación",
        },
        {
          name: "rowsPerPage",
          in: "query",
          required: false,
          schema: { type: "integer", minimum: 1 },
          description: "Cantidad de elementos por página",
        },
        {
          name: "useGetAllNoPage",
          in: "query",
          required: false,
          schema: { type: "boolean" },
          description:
            "Si es true, ignora la paginación y trae todos los elementos",
        },
      ],
      responses: {
        200: {
          description: "Lista de comunicados",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/News" },
              },
            },
          },
        },
        400: { description: "Error en la petición" },
      },
    },
    post: {
      summary: "Crear un horario",
      tags: ["News"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/NewsForm",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Comunicado creado",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/News" },
            },
          },
        },
        400: { description: "Error de validación" },
      },
    },
    delete: {
      summary: "Elimina el comunicado",
      tags: ["News"],
      parameters: [
        {
          name: "id",
          in: "query",
          required: false,
          schema: { type: "string" },
          description: "ID del grupo para filtrar",
        },
      ],
      responses: {
        200: {
          description: "Eliminado correctamente",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/News" },
              },
            },
          },
        },
        400: { description: "Error en la petición" },
      },
    },
  },
  "/api/news/getPagination": {
    get: {
      summary: "Obtener todos los comunicados (con filtros opcionales)",
      tags: ["News"],
      parameters: [
        {
          name: "search",
          in: "query",
          required: false,
          schema: { type: "string" },
          description: "ID del grupo para filtrar",
        },
        {
          name: "currentPage",
          in: "query",
          required: false,
          schema: { type: "integer", minimum: 1 },
          description: "Página actual para paginación",
        },
        {
          name: "rowsPerPage",
          in: "query",
          required: false,
          schema: { type: "integer", minimum: 1 },
          description: "Cantidad de elementos por página",
        },
        {
          name: "useGetAllNoPage",
          in: "query",
          required: false,
          schema: { type: "boolean" },
          description:
            "Si es true, ignora la paginación y trae todos los elementos",
        },
      ],
      responses: {
        200: {
          description: "Lista de comunicados",
          content: {
            "application/json": {
              schema: {
                type: "object",
                items: { $ref: "#/components/schemas/Pagination" },
              },
            },
          },
        },
        400: { description: "Error en la petición" },
      },
    },
  },
};
export const NewsSchema: { [schema: string]: Schema } = {
  NewsForm: {
    type: "object",
    required: ["type", "title", "description"],
    properties: {
      type: {
        type: "string",
        description: "Tipo de publicación",
        enum: [
          "simple-publication",
          "publication-with-images",
          "publication-with-survey",
        ],
      },
      title: {
        type: "string",
        description: "Título de la publicación",
      },
      description: {
        type: "string",
        description: "Descripción de la publicación",
      },
      images: {
        type: "array",
        description: "Imágenes relacionadas",
      },
      form: {
        type: "array",
        description: "Preguntas de la encuesta (solo si aplica)",
        items: { type: "string", example: "¿Qué te pareció el contenido?" },
        example: [],
      },
    },
  },
};
