import { Components, Paths } from "swagger-jsdoc";

export const swaggerComponents: Components = {
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
  schemas: {
    RegisterForm: {
      type: "object",
      required: [
        "firstName",
        "middleName",
        "lastName",
        "secondLastName",
        "email",
        "password",
        "confirmPassword",
        "documentType",
      ],
      properties: {
        firstName: {
          type: "string",
          description: "User's first name",
        },
        middleName: {
          type: "string",
          description: "User's middle name",
        },
        lastName: {
          type: "string",
          description: "User's last name",
        },
        secondLastName: {
          type: "string",
          description: "User's second last name",
        },
        email: {
          type: "string",
          format: "email",
          description: "User's email",
        },
        password: {
          type: "string",
          format: "password",
          description: "User's password",
        },
        confirmPassword: {
          type: "string",
          format: "password",
          description: "Password confirmation",
        },
        documentType: {
          type: "string",
          description: "Reference to user`s document type",
        },
      },
    },
    LoginCredentials: {
      type: "object",
      required: ["email", "password"],
      properties: {
        email: {
          type: "string",
          format: "email",
          description: "User's email",
        },
        password: {
          type: "string",
          format: "password",
          description: "User's password",
        },
      },
    },
    User: {
      type: "object",
      properties: {
        email: {
          type: "string",
          format: "email",
        },
        photo: {
          type: "string",
        },
      },
    },
    TypeDocument: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
      },
    },
    User1: {
      type: "object",
      properties: {
        firstName: {
          type: "string",
        },
        middleName: {
          type: "string",
        },
        lastName: {
          type: "string",
        },
        secondLastName: {
          type: "string",
        },
        email: {
          type: "string",
          format: "string",
        },
        password: {
          type: "string",
        },
        typeDocument: {
          type: "string",
        },
      },
    },
  },
};

export const swaggerPaths: Paths = {
  "/api/login/login": {
    post: {
      summary: "User login",
      tags: ["Auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/LoginCredentials",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Successful login",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  user: {
                    $ref: "#/components/schemas/User",
                  },
                  token: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Invalid credentials or user not found",
        },
      },
    },
  },
  "/api/login/register": {
    post: {
      summary: "Register new user",
      tags: ["Auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/RegisterForm",
            },
          },
        },
      },
      responses: {
        201: {
          description: "User created successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RegisterForm",
              },
            },
          },
        },
        400: {
          description: "Error in provided data",
        },
      },
    },
  },
  "/api/typeDocuments/create": {
    post: {
      summary: "Create a new type of document",
      tags: ["TypeDocument"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/TypeDocument",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Document Type created successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/TypeDocument",
              },
            },
          },
        },
        400: {
          description: "No hay nombre para el tipo de documento",
        },
      },
    },
  },
  "/api/user/getMyInfo": {
    get: {
      summary: "Get the user`s internal info from logged user",
      tags: ["User"],
      requestBody: {
        required: false,
        content: {
        },
      },
      responses: {
        200: {
          description: "Document Type created successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/TypeDocument",
              },
            },
          },
        },
        400: {
          description: "No hay nombre para el tipo de documento",
        },
        500: {
          description: "userId detected as undefined check the token validation"
        }
      },
    },
  },
};
