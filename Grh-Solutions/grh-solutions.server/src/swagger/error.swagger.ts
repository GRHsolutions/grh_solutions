// error.schemas.ts
import { Schema } from "swagger-jsdoc";

export const BadRequestErrorSchemas: { schemas: Record<string, Schema> } = {
  schemas: {
    BadRequestError: {
      type: "object",
      properties: {
        message: {
          type: "string",
          example: "No se ha proporcionado un ID de perfil válido",
        },
        innerException: {
          type: "string",
          example: "InvalidObjectIdException",
        },
      },
      required: ["message"],
    },
  },
};
