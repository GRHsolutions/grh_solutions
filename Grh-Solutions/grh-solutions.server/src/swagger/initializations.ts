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
    Rol: {
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
    UpdateUserRequest: {
      type: "object",
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
        typeDocument: {
          type: "string",
          description: "Reference to user's document type",
        },
      },
    },
    scheduleType: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        start_Date: {
          type: "date",
        },
        end_Date: {
          type: "date",
        }
      },
    },
    schedules: {
      type: "object",
      properties: {
        start_date: {
          type: "date",
        },
        end_date: {
          type: "date",
        },
        group: {
          type: "string",
        },
        ScheduleType: {
          type: "string",
        }
      },
    },
    group: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
         users: {
           type: "array",
           item: {
             type: "string",
           }
         },
         area: {
           type: "string",
         }
      },
    },
    area: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        user: {
          type: "string",
        }
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
    "/api/typeDocuments/getAllNoPage": {
    get: {
      summary: "Get all types of document",
      tags: ["TypeDocument"],
      parameters: [
        {
          name: "name",
          in: "query",
          required: false,
          schema: {
            type: "string",
          },
          description: "Filter by document type name",
        },
      ],
      responses: {
        201: {
          description: "Document Type created successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/TypeDocument",
                array: true
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
    "/api/typeDocuments/update": {
    put: {
      summary: "Update a type of document",
      tags: ["TypeDocument"],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: {
            type: "string",
          },
          description: "Filter by document type for his id",
        },
      ],
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
          description: "Document Type updated successfully",
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
    "/api/typeDocuments/delete": {
    delete: {
      summary: "Delete a type of document",
      tags: ["TypeDocument"],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: {
            type: "string",
          },
          description: "Filter by document type for his id",
        },
      ],
      responses: {
        201: {
          description: "Document Type deleted successfully",
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
    "/api/typeDocuments/getById": {
    get: {
      summary: "Returns a type of document by ID",
      tags: ["TypeDocument"],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: {
            type: "string",
          },
          description: "Filter by document type for his id",
        },
      ],
      responses: {
        201: {
          description: "Response with the type of document",
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
        content: {},
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
          description:
            "userId detected as undefined check the token validation",
        },
      },
    },
  },
  "/api/user/update": {
    put: {
      summary: "Update user information",
      tags: ["User"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UpdateUserRequest",
            },
          },
        },
      },
      responses: {
        200: {
          description: "User updated successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User1",
              },
            },
          },
        },
        400: {
          description: "Error updating user",
        },
        401: {
          description: "Unauthorized - Invalid or missing token",
        },
        500: {
          description: "Server error",
        },
      },
    },
  },
  /// ROL ENDPOINTS INITIALIZATION FOR SWAGGER.
  "/api/rol/create": {
    post: {
      summary: "Create a new rol for users",
      tags: ["Rol"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Rol",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Rol created successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Rol",
              },
            },
          },
        },
        400: {
          description: "No hay nombre para el rol",
        },
      },
    },
  },
    "/api/rol/getAllNoPage": {
    get: {
      summary: "Get all rols",
      tags: ["Rol"],
      parameters: [
        {
          name: "name",
          in: "query",
          required: false,
          schema: {
            type: "string",
          },
          description: "Filter by rol name",
        },
      ],
      responses: {
        201: {
          description: "Rol created successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/TypeDocument",
                array: true
              },
            },
          },
        },
        400: {
          description: "No hay nombre para el rol",
        },
      },
    },
  },
    "/api/rol/update": {
    put: {
      summary: "Update a rol",
      tags: ["Rol"],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: {
            type: "string",
          },
          description: "Filter by rol for his id",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Rol",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Rol updated successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Rol",
              },
            },
          },
        },
        400: {
          description: "No hay nombre para el rol",
        },
      },
    },
  },
    "/api/rol/delete": {
    delete: {
      summary: "Delete a Rol",
      tags: ["Rol"],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: {
            type: "string",
          },
          description: "Filter by rol for his id",
        },
      ],
      responses: {
        201: {
          description: "Rol deleted successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Rol",
              },
            },
          },
        },
        400: {
          description: "No hay nombre para el rol",
        },
      },
    },
  },
    "/api/rol/getById": {
    get: {
      summary: "Returns a rol by ID",
      tags: ["Rol"],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: {
            type: "string",
          },
          description: "Filter by rol for his id",
        },
      ],
      responses: {
        201: {
          description: "Response with the rol",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Rol",
              },
            },
          },
        },
        400: {
          description: "No hay nombre para el rol",
        },
      },
    },
  },
};
