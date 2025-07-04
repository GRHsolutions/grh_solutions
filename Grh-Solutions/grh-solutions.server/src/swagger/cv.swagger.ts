import { Components, Paths } from "swagger-jsdoc";

export const cvSchemas: Components["schemas"] = {
  schemas: {
    Skill: {
      type: "object",
      properties: {
        name: { type: "string" },
        level: {
          type: "string",
          enum: ["PRINCIPIANTE", "INTERMEDIO", "BUENO", "ALTO", "EXCELENTE"],
        },
      },
      required: ["name", "level"],
    },
    Language: {
      type: "object",
      properties: {
        name: { type: "string" },
        level: {
          type: "string",
          enum: [
            "PRINCIPIANTE",
            "INTERMEDIO",
            "BUENO",
            "ALTO",
            "FLUIDO",
            "A1",
            "A2",
            "B1",
            "B2",
            "C1",
            "C2",
          ],
        },
      },
      required: ["name", "level"],
    },
    Formation: {
      type: "object",
      properties: {
        tittle: { type: "string" },
        school: { type: "string" },
        city: { type: "string" },
        startDate: { type: "string", format: "date" },
        endDate: { type: "string", format: "date" },
        finished: { type: "boolean" },
        descroption: { type: "string" },
        index: { type: "number" },
      },
      required: ["tittle", "school", "city", "startDate", "finished"],
    },
    CV: {
      type: "object",
      properties: {
        firstName: { type: "string" },
        middleName: { type: "string", nullable: true },
        lastName: { type: "string" },
        secondLastName: { type: "string", nullable: true },
        mail: { type: "string" },
        phone: { type: "string" },
        address: { type: "string" },
        postal: { type: "string" },
        city: { type: "string" },
        birthDay: { type: "string", format: "date" },
        perfil: { type: "string" },
        formations: {
          type: "array",
          items: { $ref: "#/components/schemas/Formation" },
        },
        skills: {
          type: "array",
          items: { $ref: "#/components/schemas/Skill" },
        },
        lenguages: {
          type: "array",
          items: { $ref: "#/components/schemas/Language" },
        },
      },
      required: ["firstName", "lastName", "mail", "phone"],
    },
  },
};

export const cvPaths: Paths = {
  "/api/cv/": {
    post: {
      summary: "Crear CV",
      tags: ["CV"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/CV" },
          },
        },
      },
      responses: {
        200: {
          description: "CV creado exitosamente",
        },
        400: {
          description: "Error de validación o de solicitud",
        },
      },
    },
    put: {
      summary: "Editar CV",
      tags: ["CV"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/CV" },
          },
        },
      },
      responses: {
        200: {
          description: "CV actualizado exitosamente",
        },
        400: {
          description: "Error de validación o de solicitud",
        },
      },
    },
  },
};