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
          name: "page",
          in: "query",
          required: false,
          schema: { type: "integer", minimum: 1 },
          description: "Página actual para paginación",
        },
        {
          name: "limit",
          in: "query",
          required: false,
          schema: { type: "integer", minimum: 1 },
          description: "Cantidad de elementos por página",
        },
      ],
      responses: {
        200: {
          description: "Lista de comunicados y total de paginas",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/NewsResponse" },
              },
            },
          },
        },
        400: { description: "Error en la petición" },
      },
    },
    put: {
      summary: "Editar un horario",
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
          description: "Comunicado editado",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/News" },
            },
          },
        },
        400: { description: "Error de validación" },
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
  "/api/news/getById": {
    get: {
      summary: "Obtener el comunicado por ID",
      tags: ["News"],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del comunicado a buscar",
        },
      ],
      responses: {
        "200": {
          description: "Comunicado encontrado",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/News" },
            },
          },
        },
        "400": { description: "ID inválido" },
        "404": { description: "Historial no encontrado" },
        "500": { description: "Error del servidor" },
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
  News: {
    type: "object",
    properties: {
      title: { type: "string" },
      description: { type: "string" },
      images: {
        type: "array",
        items: { type: "string", format: "uri" },
      },
      formulary: {
        type: "object",
        properties: {
          id: { type: "integer" },
          form: {
            type: "array",
            items: {
              type: "object",
              properties: {
                description: { type: "string" },
                marked: { type: "boolean" },
              },
            },
          },
        },
      },
      status: {
        type: "string",
        enum: ["deleted", "shown"],
      },
      type: {
        type: "string",
        enum: [
          "simple-publication",
          "publication-with-images",
          "publication-with-survey",
        ],
      },
      numberLikes: { type: "integer", default: 0 },
      numberDisLikes: { type: "integer", default: 0 },
      date: { type: "string", format: "date-time" },
      madeBy: { type: "string" },
      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
    },
  },
  NewsResponse: {
    type: "object",
    properties: {
      data: {
        type: "array",
        items: { $ref: "#/components/schemas/News" },
        description: "Lista de noticias",
      },
      totalPages: {
        type: "integer",
        description: "Número total de páginas calculado",
        example: 5,
      },
    },
  },
};
