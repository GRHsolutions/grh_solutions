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
        "typeDocument",
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
        typeDocument: {
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
        _id: {
          type: "string",
          example: "60f6c0c1a3d2f9001c8a64b2",
        },
        name: {
          type: "string",
          example: "admin",
        },
        permissions: {
          type: "array",
          items: {
            type: "string",
            example: "60f6c2f0a3d2f9001c8a64b3", // ObjectId de permiso
          },
        },
        isActive: {
          type: "boolean",
          example: true,
        },
      },
      required: ["name"],
    },
    PartialUpdateRol: {
      type: "object",
      properties: {
        name: { type: "string", example: "editor" },
        isActive: { type: "boolean", example: true },
        addPermissions: {
          type: "array",
          items: { type: "string" },
          example: ["60f6c2f0a3d2f9001c8a64b4"],
        },
        removePermissions: {
          type: "array",
          items: { type: "string" },
          example: ["60f6c2f0a3d2f9001c8a64b3"],
        },
      },
    },
    Vacancy: {
      type: "object",
      required: [
        "tittle",
        "description",
        "type_contract",
        "salary",
        "horary",
        "charge",
        "area",
        "address",
        "telephone",
        "email",
        "type_modality",
        "experience",
        "formation",
        "status",
      ],
      properties: {
        tittle: { type: "string" },
        description: { type: "string" },
        type_contract: { type: "string" },
        salary: { type: "string" },
        horary: { type: "string" },
        charge: { type: "string" },
        area: { type: "string" },
        address: { type: "string" },
        telephone: { type: "string" },
        email: { type: "string" },
        type_modality: { type: "string" },
        experience: { type: "string" },
        formation: { type: "string" },
        status: { type: "string" },
      },
    },
    TypeContract: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
      },
      required: ["name"],
    },
    PostulanteCreate: {
      type: "object",
      properties: {
        user: { type: "string" },
        vacante: { type: "string" },
        status: { type: "string", example: "Pendiente" },
      },
      required: ["vacante", "user"],
    },
    PostulanteUpdate: {
      type: "object",
      properties: {
        status: {
          type: "string",
          description: "Nuevo estado del postulante",
          example: "contratado",
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
        isActive: {
          type: "boolean",
          example: true,
          description: "Indica si el usuario está activo o ha sido desactivado",
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
    Permission: {
      type: "object",
      properties: {
        ident: {
          type: "object",
          properties: {
            method: {
              type: "string",
              enum: ["GET", "POST", "PUT", "DELETE", "PATCH", "MODULE"],
              example: "GET",
            },
            originalUrl: {
              type: "string",
              example: "/api/users/list",
            },
            module: {
              type: "string",
            },
          },
          required: ["method", "originalUrl", "module"],
        },
        description: {
          type: "string",
          example: "Permite listar usuarios",
        },
      },
      required: ["ident"],
    },
    schedules: {
      type: "object",
      required: ["start_date", "end_date", "group", "ScheduleType"],
      properties: {
        start_date: {
          type: "string",
          format: "date-time",
          example: "2025-07-03T08:00:00Z",
        },
        end_date: {
          type: "string",
          format: "date-time",
          example: "2025-07-03T16:00:00Z",
        },
        group: {
          type: "string",
          example: "64e3f82b9f6d3c1234567891",
        },
        scheduleType: {
          type: "string",
          example: "64e3f82b9f6d3c1234567892",
        },
      },
    },
    Group: {
      type: "object",
      required: ["name", "users", "area"],
      properties: {
        name: {
          type: "string",
          example: "Grupo A",
        },
        users: {
          type: "array",
          items: {
            type: "string",
            example: "64e3f82b9f6d3c1234567891",
          },
        },
        area: {
          type: "string",
          example: "64e3f82b9f6d3c1234567892",
        },
        createdAt: {
          type: "string",
          format: "date-time",
          example: "2025-07-01T12:00:00.000Z",
        },
        updatedAt: {
          type: "string",
          format: "date-time",
          example: "2025-07-01T12:00:00.000Z",
        },
      },
    },
    GroupInput: {
      type: "object",
      required: ["name", "users", "area"],
      properties: {
        name: {
          type: "string",
          example: "Grupo A",
        },
        users: {
          type: "array",
          items: {
            type: "string",
            example: "64e3f82b9f6d3c1234567891",
          },
        },
        area: {
          type: "string",
          example: "64e3f82b9f6d3c1234567892",
        },
      },
    },
    Area: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
      },
    },
    ScheduleType: {
      type: "object",
      properties: {
        name: {
          type: "string",
          example: "Turno mañana",
        },
        startTime: {
          type: "string",
          example: "08:00",
          description: "Hora de inicio en formato HH:mm",
        },
        endTime: {
          type: "string",
          example: "12:00",
          description: "Hora de fin en formato HH:mm",
        },
      },
    },
    Puesto: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
      },
    },
    empleados: {
      type: "object",
      required: ["users", "puesto"],
      properties: {
        users: {
          type: "object",
          items: {
            $ref: "#/components/schemas/User",
          },
        },
        puesto: {
          $ref: "#/components/schemas/Puesto",
        },
        area: {
          $ref: "#/components/schemas/Area",
        },
        status: {
          type: "string",
          enum: ["activo", "inactivo", "eliminado"],
        },
      },
    },
    News: {
      type: "object",
      properties: {
        title: {
          type: "string",
        },
        description: {
          type: "string",
        },
        images: {
          type: "array",
          items: {
            type: "string",
            format: "uri",
          },
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
        numberLikes: {
          type: "integer",
          default: 0,
        },
        numberDisLikes: {
          type: "integer",
          default: 0,
        },
        date: {
          type: "string",
          format: "date-time",
        },
        madeBy: {
          type: "string",
        },
        createdAt: {
          type: "string",
          format: "date-time",
        },
        updatedAt: {
          type: "string",
          format: "date-time",
        },
      },
    },
    Pagination: {
      type: "object",
      properties: {
        currentPage: {
          type: "number",
        },
        rowsPerPage: {
          type: "number",
        },
        totalPages: {
          type: "number",
        },
        totalItems: {
          type: "number",
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
                array: true,
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
  /// USER ENDPOINTS INITIALIZATION FOR SWAGGER.
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
  "/api/user/getAll": {
    get: {
      summary: "Obtener todos los usuarios",
      tags: ["User"],
      security: [{ bearerAuth: [] }], // quítalo si no usas JWT
      responses: {
        200: {
          description: "Lista de usuarios",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/User" },
              },
            },
          },
        },
        401: { description: "No autorizado" },
        500: { description: "Error del servidor" },
      },
    },
  },
"/api/user/getById/{id}": {
  get: {
    summary: "Obtener usuario por ID",
    tags: ["User"],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: {
          type: "string"
        },
        description: "ID del usuario"
      }
    ],
    responses: {
      "200": { description: "Usuario encontrado" },
      "400": { description: "ID inválido" },
      "404": { description: "Usuario no encontrado" }
    }
  }
},
  "/api/user/updateUser": {
    put: {
      summary: "Actualizar cualquier usuario por ID",
      tags: ["User"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "ID del usuario a actualizar",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/User1" }, // ó UpdateUserRequest
          },
        },
      },
      responses: {
        200: {
          description: "Usuario actualizado",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/User1" },
            },
          },
        },
        400: { description: "Error de validación" },
        401: { description: "No autorizado" },
        500: { description: "Error del servidor" },
      },
    },
  },
  "/api/user/delete": {
    delete: {
      summary: "Desactivar usuario (cambio de estado isActive = false)",
      tags: ["User"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "ID del usuario a desactivar",
        },
      ],
      responses: {
        200: {
          description: "Usuario desactivado correctamente",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Usuario desactivado (isActive: false)",
                  },
                },
              },
            },
          },
        },
        404: { description: "Usuario no encontrado" },
        401: { description: "No autorizado" },
      },
    },
  },
  "/api/user/changePassword": {
    put: {
      summary: "Cambiar contraseña",
      tags: ["User"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                currentPassword: { type: "string" },
                newPassword: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Contraseña cambiada correctamente",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Contraseña cambiada correctamente",
                  },
                },
              },
            },
          },
        },
        401: { description: "No autorizado" },
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
                array: true,
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
              $ref: "#/components/schemas/PartialUpdateRol",
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
  /// VACANTES ENDPOINTS INITIALIZATION FOR SWAGGER.
  "/api/vacancies/create": {
    post: {
      summary: "Create a new vacancy",
      tags: ["Vacantes"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Vacancy",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Vacancy created successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Vacancy",
              },
            },
          },
        },
        400: {
          description: "Missing or invalid fields for vacancy creation",
        },
      },
    },
  },
  "/api/vacancies/getAll": {
    get: {
      summary: "Get all vacancies",
      tags: ["Vacantes"],
      responses: {
        201: {
          description: "Vacancies retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Vacancy",
                },
              },
            },
          },
        },
        400: {
          description: "Error retrieving vacancies",
        },
      },
    },
  },
  "/api/vacancies/update": {
    put: {
      summary: "Update a vacancy",
      tags: ["Vacantes"],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: {
            type: "string",
          },
          description: "ID of the vacancy to update",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Vacancy",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Vacancy updated successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Vacancy",
              },
            },
          },
        },
        400: {
          description: "Missing or invalid fields for vacancy update",
        },
      },
    },
  },
  "/api/vacancies/delete": {
    delete: {
      summary: "Delete a vacancy",
      tags: ["Vacantes"],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: {
            type: "string",
          },
          description: "ID of the vacancy to delete",
        },
      ],
      responses: {
        201: {
          description: "Vacancy deleted successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Vacancy",
              },
            },
          },
        },
        400: {
          description: "Invalid vacancy ID or not found",
        },
      },
    },
  },
  "/api/vacancies/getById": {
    get: {
      summary: "Returns a vacancy by ID",
      tags: ["Vacantes"],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: {
            type: "string",
          },
          description: "ID of the vacancy",
        },
      ],
      responses: {
        201: {
          description: "Vacancy found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Vacancy",
              },
            },
          },
        },
        400: {
          description: "Invalid ID or vacancy not found",
        },
      },
    },
  },
  "/api/vacancies/getPaginated": {
    get: {
      summary: "Get paginated vacancies",
      tags: ["Vacantes"],
      parameters: [
        {
          name: "page",
          in: "query",
          required: true,
          schema: {
            type: "integer",
          },
          description: "Page number",
        },
        {
          name: "limit",
          in: "query",
          required: false,
          schema: {
            type: "integer",
          },
          description: "Items per page",
        },
      ],
      responses: {
        201: {
          description: "Paginated vacancies retrieved",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Vacancy",
                },
              },
            },
          },
        },
        400: {
          description: "Invalid pagination parameters",
        },
      },
    },
  },
  "/api/vacancies/getTotalPages": {
    get: {
      summary: "Get total pages of vacancies",
      tags: ["Vacantes"],
      responses: {
        201: {
          description: "Total pages retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "integer",
              },
            },
          },
        },
        400: {
          description: "Error getting total pages",
        },
      },
    },
  },
  /// TYPECONTRACT ENDPOINTS FOR SWAGGER
  "/api/typeContract/create": {
    post: {
      summary: "Crear un tipo de contrato",
      tags: ["TypeContract"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/TypeContract",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Tipo de contrato creado exitosamente",
        },
        400: {
          description: "Error al crear el tipo de contrato",
        },
      },
    },
  },
  "/api/typeContract/update": {
    put: {
      summary: "Actualizar un tipo de contrato",
      tags: ["TypeContract"],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: {
            type: "string",
          },
          description: "ID del tipo de contrato a actualizar",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/TypeContract",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Tipo de contrato actualizado exitosamente",
        },
        400: {
          description: "Error al actualizar",
        },
      },
    },
  },
  "/api/typeContract/delete": {
    delete: {
      summary: "Eliminar un tipo de contrato",
      tags: ["TypeContract"],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: {
            type: "string",
          },
          description: "ID del tipo de contrato a eliminar",
        },
      ],
      responses: {
        201: {
          description: "Tipo de contrato eliminado exitosamente",
        },
        400: {
          description: "Error al eliminar",
        },
      },
    },
  },
  "/api/typeContract/getAll": {
    get: {
      summary: "Obtener todos los tipos de contrato",
      tags: ["TypeContract"],
      responses: {
        201: {
          description: "Lista de tipos de contrato",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/TypeContract",
                },
              },
            },
          },
        },
        400: {
          description: "Error al obtener los tipos de contrato",
        },
      },
    },
  },
  /// PERMISSIONS ENDPOINTS  FOR SWAGGER
  "/api/permission/": {
    get: {
      summary: "Obtener todos los permisos del eplicativo",
      tags: ["Permission"],
      parameters: [
        {
          name: "search",
          in: "query",
          required: false,
          schema: { type: "string" },
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
        201: {
          description: "Lista de permisos",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Permission",
                },
              },
            },
          },
        },
        400: {
          description: "Error al obtener los permisos",
        },
      },
    },
  },
  "/api/permission/create": {
    post: {
      summary: "Crear un nuevo permiso",
      tags: ["Permission"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Permission",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Permiso creado exitosamente",
        },
        400: {
          description: "Error al crear el permiso",
        },
      },
    },
  },
  "/api/permission/update": {
    put: {
      summary: "Actualizar un permiso",
      tags: ["Permission"],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: {
            type: "string",
          },
          description: "ID del permiso a actualizar",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Permission",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Permiso actualizado exitosamente",
        },
        400: {
          description: "Error al actualizar el permiso",
        },
      },
    },
  },
  "/api/permission/delete": {
    delete: {
      summary: "Eliminar un permiso",
      tags: ["Permission"],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: {
            type: "string",
          },
          description: "ID del permiso a eliminar",
        },
      ],
      responses: {
        201: {
          description: "Permiso eliminado exitosamente",
        },
        400: {
          description: "Error al eliminar el permiso",
        },
      },
    },
  },

  /// POSTULANTE ENDPOINTS  FOR SWAGGER
  "/api/postulante/create": {
    post: {
      summary: "Crear un nuevo postulante",
      tags: ["Postulante"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/PostulanteCreate",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Postulante creado exitosamente",
        },
        400: {
          description: "Error al crear el postulante",
        },
      },
    },
  },
  "/api/postulante/getAllByVacante/{vacanteId}": {
    get: {
      summary: "Obtener postulantes por vacante",
      tags: ["Postulante"],
      parameters: [
        {
          name: "vacanteId",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
          description: "ID de la vacante",
        },
      ],
      responses: {
        200: {
          description: "Lista de postulantes",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Postulante",
                },
              },
            },
          },
        },
        400: {
          description: "ID de vacante inválido",
        },
        500: {
          description: "Error interno",
        },
      },
    },
  },
  "/api/postulante/getAllByVacanteByUser/{userId}": {
    get: {
      summary: "Obtener postulantes por usuario",
      tags: ["Postulante"],
      parameters: [
        {
          name: "userId",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
          description: "ID del usuario",
        },
      ],
      responses: {
        200: {
          description: "Lista de postulantes",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Postulante",
                },
              },
            },
          },
        },
        400: {
          description: "ID de usuario inválido",
        },
        500: {
          description: "Error interno",
        },
      },
    },
  },

  "/api/postulante/update/{id}": {
    put: {
      summary: "Actualizar postulante",
      tags: ["Postulante"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
          description: "ID del postulante a actualizar",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/PostulanteUpdate",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Postulante actualizado",
        },
        400: {
          description: "ID inválido o datos incorrectos",
        },
        500: {
          description: "Error interno",
        },
      },
    },
  },

  "/api/postulante/delete/{id}": {
    delete: {
      summary: "Eliminar postulante",
      tags: ["Postulante"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
          description: "ID del postulante a eliminar",
        },
      ],
      responses: {
        200: {
          description: "Postulante eliminado correctamente",
        },
        400: {
          description: "ID inválido",
        },
        500: {
          description: "Error interno",
        },
      },
    },
  },
  // GRUPOS ENDPOINTS FOR SWAGGER
  "/api/group/getAll": {
    get: {
      summary: "Obtener todos los grupos (con filtro opcional por nombre)",
      tags: ["Groups"],
      parameters: [
        {
          name: "name",
          in: "query",
          required: false,
          schema: { type: "string" },
          description: "Filtrar grupos cuyo nombre contenga este valor",
        },
      ],
      responses: {
        200: {
          description: "Lista de grupos",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Group" },
              },
            },
          },
        },
        400: {
          description: "Error en la petición",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "Error message aquí" },
                  innerExpression: { type: "string", nullable: true },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/group/create": {
    post: {
      summary: "crear grupo",
      tags: ["Groups"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Group",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Grupo creado",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Group" },
            },
          },
        },
        404: {
          description: "Grupo no encontrado",
        },
      },
    },
  },
  "/api/group/delete/{id}": {
    delete: {
      summary: "Eliminar un grupo por ID",
      tags: ["Groups"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: {
          description: "Grupo eliminado correctamente",
        },
        404: {
          description: "Grupo no encontrado",
        },
      },
    },
  },
  "/api/group/deleteUserFromGroup": {
    delete: {
      summary: "Eliminar un usuario de un grupo",
      tags: ["Groups"],
      parameters: [
        {
          name: "groupId",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del grupo del que se quiere eliminar el usuario",
        },
        {
          name: "userId",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del usuario que se quiere eliminar",
        },
      ],
      responses: {
        200: {
          description: "Usuario eliminado del grupo correctamente",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Usuario eliminado del grupo correctamente",
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Error en los parámetros o petición",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "No se ha proporcionado un ID para el grupo",
                  },
                  innerExpression: { type: "string", nullable: true },
                },
              },
            },
          },
        },
        404: {
          description: "Grupo no encontrado",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "Grupo no encontrado" },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/group/update": {
    put: {
      summary:
        "Actualizar nombre del grupo, añadir usuario y/o cambiar el área",
      description:
        "Permite cambiar el nombre del grupo, añadir un usuario al array users, cambiar el área, o cualquier combinación de estas acciones.",
      tags: ["Groups"],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del grupo a actualizar",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  example: "Grupo Renovado",
                },
                userId: {
                  type: "string",
                  example: "64e3f82b9f6d3c1234567891",
                  description: "ID del usuario que se añadirá al grupo",
                },
                area: {
                  type: "string",
                  example: "64e3f82b9f6d3c1234567800",
                  description: "ID del área que se asignará al grupo",
                },
              },
              oneOf: [
                { required: ["name"] },
                { required: ["userId"] },
                { required: ["area"] },
              ],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Grupo actualizado correctamente",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Group" },
            },
          },
        },
        400: {
          description: "Falta de parámetros o validación",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example:
                      "Debes enviar al menos 'name', 'userId' o 'area' para actualizar",
                  },
                  innerExpression: { type: "string", nullable: true },
                },
              },
            },
          },
        },
        404: {
          description: "Grupo no encontrado",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "Grupo no encontrado" },
                },
              },
            },
          },
        },
      },
    },
  },
  // AREAS ENDPOINTS FOR SWAGGER
  "/api/area/create": {
    post: {
      summary: "Crear un área",
      tags: ["Areas"],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name"],
              properties: {
                name: { type: "string", example: "Área 51" },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Área creada",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Area" },
            },
          },
        },
        400: {
          description: "Error de validación",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                  innerExpression: { type: "string", nullable: true },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/area/delete": {
    delete: {
      summary: "Eliminar un área",
      tags: ["Areas"],

      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del área a eliminar",
        },
      ],
      responses: {
        200: {
          description: "Área eliminada correctamente",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Area eliminado correctamente",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Área no encontrado",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "Area no encontrado" },
                },
              },
            },
          },
        },
        400: {
          description: "Error en la petición",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                  innerExpression: { type: "string", nullable: true },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/area/getAllNoPage": {
    get: {
      summary: "Obtener todas las áreas sin paginación",
      tags: ["Areas"],

      responses: {
        200: {
          description: "Lista de áreas",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Area" },
              },
            },
          },
        },
        400: {
          description: "Error en la petición",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                  innerExpression: { type: "string", nullable: true },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/area/getById": {
    get: {
      summary: "Obtener un área por ID",
      tags: ["Areas"],

      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del área",
        },
      ],
      responses: {
        200: {
          description: "Área encontrada",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Area" },
            },
          },
        },
        404: {
          description: "Área no encontrada",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "Area no encontrado" },
                },
              },
            },
          },
        },
        400: {
          description: "Error en la petición",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                  innerExpression: { type: "string", nullable: true },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/area/update": {
    put: {
      summary: "Actualizar un área",
      tags: ["Areas"],

      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del área a actualizar",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name"],
              properties: {
                name: { type: "string", example: "Área actualizada" },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Área actualizada",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Area" },
            },
          },
        },
        400: {
          description: "Error en la petición",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                  innerExpression: { type: "string", nullable: true },
                },
              },
            },
          },
        },
      },
    },
  },
  // SCHEDULETYPES ENDPOINTS FOR SWAGGER
  "/api/scheduleType/create": {
    post: {
      summary: "Crear un tipo de horario",
      tags: ["ScheduleType"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name", "startTime", "endTime"],
              properties: {
                name: { type: "string", example: "Turno Mañana" },
                startTime: {
                  type: "string",
                  example: "08:00",
                  description: "Hora de inicio en formato HH:mm",
                },
                endTime: {
                  type: "string",
                  example: "12:00",
                  description: "Hora de fin en formato HH:mm",
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Tipo de horario creado",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ScheduleType" },
            },
          },
        },
        400: { description: "Error de validación" },
      },
    },
  },
  "/api/scheduleType/getAllNoPage": {
    get: {
      summary: "Obtener todos los tipos de horario",
      tags: ["ScheduleType"],
      responses: {
        200: {
          description: "Lista de tipos de horario",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/ScheduleType" },
              },
            },
          },
        },
        400: { description: "Error en la petición" },
      },
    },
  },
  "/api/scheduleType/getById": {
    get: {
      summary: "Obtener un tipo de horario por ID",
      tags: ["ScheduleType"],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del tipo de horario",
        },
      ],
      responses: {
        200: {
          description: "Tipo de horario encontrado",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ScheduleType" },
            },
          },
        },
        404: { description: "Tipo de horario no encontrado" },
      },
    },
  },
  "/api/scheduleType/update": {
    put: {
      summary: "Actualizar un tipo de horario",
      tags: ["ScheduleType"],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del tipo de horario",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name", "startTime", "endTime"],
              properties: {
                name: { type: "string", example: "Turno Tarde" },
                startTime: {
                  type: "string",
                  example: "14:00",
                },
                endTime: {
                  type: "string",
                  example: "22:00",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Tipo de horario actualizado",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ScheduleType" },
            },
          },
        },
        400: { description: "Error en la petición" },
      },
    },
  },
  "/api/scheduleType/delete": {
    delete: {
      summary: "Eliminar un tipo de horario",
      tags: ["ScheduleType"],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del tipo de horario a eliminar",
        },
      ],
      responses: {
        200: {
          description: "Tipo de horario eliminado correctamente",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Tipo de horario eliminado correctamente",
                  },
                },
              },
            },
          },
        },
        404: { description: "Tipo de horario no encontrado" },
      },
    },
  },
  // SCHEDULES ENDPOINTS FOR SWAGGER
  "/api/schedules/create": {
    post: {
      summary: "Crear un horario",
      tags: ["Schedules"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/schedules",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Horario creado",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/schedules" },
            },
          },
        },
        400: { description: "Error de validación" },
      },
    },
  },
  "/api/schedules/getAllNoPage": {
    get: {
      summary: "Obtener todos los horarios (con filtros opcionales)",
      tags: ["Schedules"],
      parameters: [
        {
          name: "group",
          in: "query",
          required: false,
          schema: { type: "string" },
          description: "ID del grupo para filtrar",
        },
        {
          name: "scheduleType",
          in: "query",
          required: false,
          schema: { type: "string" },
          description: "ID del tipo de horario para filtrar",
        },
      ],
      responses: {
        200: {
          description: "Lista de horarios",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/schedules" },
              },
            },
          },
        },
        400: { description: "Error en la petición" },
      },
    },
  },
  "/api/schedules/getById": {
    get: {
      summary: "Obtener un horario por ID",
      tags: ["Schedules"],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: {
          description: "Horario encontrado",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/schedules" },
            },
          },
        },
        404: { description: "Horario no encontrado" },
      },
    },
  },
  "/api/schedules/update": {
    put: {
      summary: "Actualizar un horario",
      tags: ["Schedules"],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del horario a actualizar",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/schedules",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Horario actualizado",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/schedules" },
            },
          },
        },
        400: { description: "Error en la petición" },
      },
    },
  },
  "/api/schedules/delete": {
    delete: {
      summary: "Eliminar un horario por ID",
      tags: ["Schedules"],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del horario a eliminar",
        },
      ],
      responses: {
        200: {
          description: "Horario eliminado correctamente",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Horario eliminado correctamente",
                  },
                },
              },
            },
          },
        },
        404: { description: "Horario no encontrado" },
      },
    },
  },
  // PUESTO ENDPOINTS FOR SWAGGER
  "/api/puesto/create": {
    post: {
      summary: "Crear un puesto",
      tags: ["Puestos"],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name"],
              properties: {
                name: { type: "string", example: "Supervisor de turno" },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Puesto creado",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Puesto" },
            },
          },
        },
        400: {
          description: "Error de validación",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                  innerExpression: { type: "string", nullable: true },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/puesto/delete": {
    delete: {
      summary: "Eliminar un puesto",
      tags: ["Puestos"],

      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del puesto a eliminar",
        },
      ],
      responses: {
        200: {
          description: "Puesto eliminado correctamente",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "puesto eliminada correctamente",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Puesto no encontrado",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "puesto no encontrado" },
                },
              },
            },
          },
        },
        400: {
          description: "Error en la petición",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                  innerExpression: { type: "string", nullable: true },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/puesto/getAll": {
    get: {
      summary: "Obtener todos los puestos",
      tags: ["Puestos"],

      parameters: [
        {
          name: "name",
          in: "query",
          required: false,
          schema: { type: "string" },
          description: "Filtrar puestos por nombre",
        },
      ],
      responses: {
        200: {
          description: "Lista de puestos",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Puesto" },
              },
            },
          },
        },
        400: {
          description: "Error en la petición",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                  innerExpression: { type: "string", nullable: true },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/puesto/getById": {
    get: {
      summary: "Obtener un puesto por ID",
      tags: ["Puestos"],

      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del puesto",
        },
      ],
      responses: {
        200: {
          description: "Puesto encontrado",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Puesto" },
            },
          },
        },
        404: {
          description: "Puesto no encontrado",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "puesto no encontrado" },
                },
              },
            },
          },
        },
        400: {
          description: "Error en la petición",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                  innerExpression: { type: "string", nullable: true },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/puesto/update": {
    put: {
      summary: "Actualizar un puesto",
      tags: ["Puestos"],

      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del puesto a actualizar",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name"],
              properties: {
                name: { type: "string", example: "Jefe de Producción" },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Puesto actualizado",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Puesto" },
            },
          },
        },
        400: {
          description: "Error en la petición",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                  innerExpression: { type: "string", nullable: true },
                },
              },
            },
          },
        },
      },
    },
  },
  // EMPLEADOS ENDPOINTS FOR SWAGGER
  "/api/empleados/getAll": {
    get: {
      summary: "Obtener todos los empleados",
      tags: ["Empleados"],
      responses: {
        200: {
          description: "Lista de empleados",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/empleados" },
              },
            },
          },
        },
        500: {
          description: "Error del servidor",
        },
      },
    },
  },
  "/api/empleados/getById": {
    get: {
      summary: "Obtener un empleado por ID",
      tags: ["Empleados"],

      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del empleado",
        },
      ],
      responses: {
        200: {
          description: "Empleado encontrado",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/empleados" },
            },
          },
        },
        404: {
          description: "Empleado no encontrado",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Empleado no encontrado",
                  },
                },
              },
            },
          },
        },
        400: {
          description: "ID inválido",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "ID inválido para el empleado",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/empleados/update": {
    put: {
      summary: "Actualizar un empleado",
      description:
        "Permite cambiar la lista de usuarios y/o el puesto asociado.",
      tags: ["Empleados"],

      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del empleado a actualizar",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                users: {
                  type: "array",
                  items: {
                    type: "string",
                    example: "64e3f82b9f6d3c1234567891",
                  },
                },
                puesto: {
                  type: "string",
                  example: "64e3f82b9f6d3c1234567892",
                },
              },
              oneOf: [{ required: ["users"] }, { required: ["puesto"] }],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Empleado actualizado correctamente",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/empleados" },
            },
          },
        },
        400: {
          description: "Falta de parámetros o validación",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example:
                      "Debes enviar al menos 'users' o 'puesto' para actualizar",
                  },
                  innerExpression: { type: "string", nullable: true },
                },
              },
            },
          },
        },
        404: {
          description: "Empleado no encontrado",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Empleado no encontrado",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/empleados/delete/{id}": {
    delete: {
      summary: "Eliminar un empleado",
      tags: ["Empleados"],

      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "ID del empleado a eliminar",
        },
      ],
      responses: {
        200: {
          description: "Empleado eliminado correctamente",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Empleado eliminado correctamente",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Empleado no encontrado",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Empleado no encontrado",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  //-------------PROFILES------------
  "/api/profiles/create": {
    post: {
      summary: "Crear perfil",
      tags: ["Profiles"],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name", "start_Date", "end_Date"],
              properties: {
                name: { type: "string", example: "Turno Mañana" },
                start_Date: {
                  type: "string",
                  format: "date-time",
                  example: "2025-07-03T06:00:00Z",
                },
                end_Date: {
                  type: "string",
                  format: "date-time",
                  example: "2025-07-03T14:00:00Z",
                },
                user: { type: "string", example: "64d1..." },
                lastname: { type: "string", example: "Ballesta" },
                date_of_birth: {
                  type: "string",
                  format: "date",
                  example: "1995-06-10",
                },
                email: { type: "string", example: "miguel@example.com" },
                address: { type: "string", example: "Calle 123" },
                number_phone: { type: "number", example: 3121234567 },
                telephone: { type: "number", example: 1234567 },
                rh: { type: "string", example: "O+" },
                status: { type: "string", example: "activo" },
                type_document: { type: "string", example: "CC" },
                document: { type: "number", example: 1020304050 },
                vacancy_name: {
                  type: "string",
                  example: "Desarrollador Backend",
                },
                date_application: {
                  type: "string",
                  format: "date",
                  example: "2025-07-03",
                },
              },
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Perfil creado exitosamente",
        },
        "400": {
          description: "Error en la solicitud",
        },
      },
    },
  },
  "/api/profiles/getById": {
    get: {
      summary: "Obtener perfil por ID",
      tags: ["Profiles"],

      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del perfil",
        },
      ],
      responses: {
        "200": {
          description: "Perfil encontrado",
        },
        "400": {
          description: "Solicitud inválida",
        },
      },
    },
  },
  "/api/profiles/getByUserId": {
    get: {
      summary: "Obtener perfil por ID de usuario",
      tags: ["Profiles"],

      responses: {
        "200": {
          description: "Perfil encontrado",
        },
        "400": {
          description: "Error al buscar perfil",
        },
      },
    },
  },
  "/api/profiles/update": {
    put: {
      summary: "Actualizar un perfil",
      tags: ["Profiles"],

      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del perfil a actualizar",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Profile",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Perfil actualizado",
        },
        "400": {
          description: "Error en la petición",
        },
      },
    },
  },
  "/api/profiles/delete": {
    delete: {
      summary: "Eliminar un perfil",
      tags: ["Profiles"],

      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del perfil a eliminar",
        },
      ],
      responses: {
        "200": {
          description: "Perfil eliminado",
        },
        "400": {
          description: "Error al eliminar perfil",
        },
        "404": {
          description: "Perfil no encontrado",
        },
      },
    },
  },
};
