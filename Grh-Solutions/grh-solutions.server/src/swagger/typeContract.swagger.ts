import { PathItem, Schema } from "swagger-jsdoc";

export const TypeContractPaths: Record<string, PathItem> = {
  "/api/typeContract/create": {
    post: {
      summary: "Crear tipo de contrato",
      tags: ["Type Contract"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/TypeContract" },
          },
        },
      },
      responses: {
        "201": { description: "Tipo de contrato creado exitosamente" },
        "400": { description: "Datos inválidos" },
      },
    },
  },

  "/api/typeContract/getAll": {
    get: {
      summary: "Listar todos los tipos de contrato",
      tags: ["Type Contract"],
      security: [{ bearerAuth: [] }],
      responses: {
        "200": { description: "Lista de tipos de contrato" },
        "500": { description: "Error del servidor" },
      },
    },
  },

  "/api/typeContract/getById": {
    get: {
      summary: "Obtener tipo de contrato por ID",
      tags: ["Type Contract"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del tipo de contrato",
        },
      ],
      responses: {
        "200": { description: "Tipo de contrato encontrado" },
        "400": { description: "ID inválido" },
        "404": { description: "Tipo de contrato no encontrado" },
      },
    },
  },

  "/api/typeContract/update": {
    put: {
      summary: "Actualizar tipo de contrato",
      tags: ["Type Contract"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del tipo de contrato a actualizar",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/TypeContract" },
          },
        },
      },
      responses: {
        "200": { description: "Tipo de contrato actualizado exitosamente" },
        "400": { description: "Datos inválidos" },
      },
    },
  },

  "/api/typeContract/delete": {
    delete: {
      summary: "Eliminar tipo de contrato",
      tags: ["Type Contract"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del tipo de contrato a eliminar",
        },
      ],
      responses: {
        "200": { description: "Tipo de contrato eliminado exitosamente" },
        "400": { description: "ID inválido" },
        "404": { description: "Tipo de contrato no encontrado" },
      },
    },
  },
};

export const TypeContractSchema: { schemas: Record<string, Schema> } = {
  schemas: {
    TypeContract: {
      type: "object",
      required: ["name"],
      properties: {
        name: {
          type: "string",
          example: "Contrato a término indefinido",
        },
        description: {
          type: "string",
          example: "Contrato sin una fecha de finalización pactada.",
        },
        content: {
          type: "string",
          example:
            "1. Objeto: El contrato tiene por finalidad definir las condiciones bajo las cuales el CONTRATISTA realizará las actividades acordadas de forma responsable y conforme a las instrucciones del CONTRATANTE.\n\n2. Duración: El contrato tendrá vigencia desde la fecha de firma y hasta la finalización de las actividades pactadas.\n\n3. Pago: El CONTRATANTE pagará al CONTRATISTA el valor previamente acordado, contra entrega conforme y aprobación del servicio.\n\n4. Obligaciones del Contratista: El CONTRATISTA se compromete a cumplir las tareas asignadas con calidad, puntualidad y confidencialidad.\n\n5. Confidencialidad: Las partes mantendrán en reserva la información intercambiada durante la ejecución del contrato.\n\n6. Propiedad: Todo trabajo, documento o producto entregado pertenece al CONTRATANTE.\n\n7. Terminación: El contrato podrá darse por terminado cuando alguna de las partes incumpla sus obligaciones o por acuerdo mutuo.\n\n8. Ley Aplicable: El contrato se rige por las leyes de la República de Colombia.",
        },
      },
    },
  },
};
