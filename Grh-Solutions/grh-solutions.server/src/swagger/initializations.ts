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
        }
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
    Postulante: {
      type: "object",
      properties: {
        user: {
          type: "string",
          description: "ID del usuario que se postula",
        },
        vacante: {
          type: "string",
          description: "ID de la vacante a la que se postula",
        },
        status: {
          type: "string",
          description: "Estado de la postulación",
          example: "Pendiente",
        },
      },
      required: ["vacante"],
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
    Permission: {
      type: "object",
      properties: {
        ident: {
          type: "object",
          properties: {
            method: {
              type: "string",
              enum: ["GET", "POST", "PUT", "DELETE", "PATCH"],
              example: "GET"
            },
            originalUrl: {
              type: "string",
              example: "/api/users/list"
            },
            module: {
              type: "string",
            }
          },
          required: ["method", "originalUrl", "module"]
        },
        description: {
          type: "string",
          example: "Permite listar usuarios"
        }
      },
      required: ["ident"]
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
    // GRUPOS EJEMPLO ----------------------------------------
    Group: {
      type: "object",
      required: ["name", "users", "area"],
      properties: {
        _id: {
          type: "string",
          example: "64e3f82b9f6d3c1234567890"
        },
        name: {
          type: "string",
          example: "Grupo A"
        },
        users: {
          type: "array",
          items: {
            type: "string",
            example: "64e3f82b9f6d3c1234567891"
          }
        },
        area: {
          type: "string",
          example: "64e3f82b9f6d3c1234567892"
        },
        createdAt: {
          type: "string",
          format: "date-time",
          example: "2025-07-01T12:00:00.000Z"
        },
        updatedAt: {
          type: "string",
          format: "date-time",
          example: "2025-07-01T12:00:00.000Z"
        }
      }
    },
    GroupInput: {
      type: "object",
      required: ["name", "users", "area"],
      properties: {
        name: {
          type: "string",
          example: "Grupo A"
        },
        users: {
          type: "array",
          items: {
            type: "string",
            example: "64e3f82b9f6d3c1234567891"
          }
        },
        area: {
          type: "string",
          example: "64e3f82b9f6d3c1234567892"
        }
      }
    },

    // ----------------------------------------------------------------------
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
  "/api/permission/":{
    get: {
      summary: "Obtener todos los permisos del eplicativo",
      tags: ["Permission"],
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
              type: "object",
              properties: {
                status: {
                  type: "string",
                  description: "Nuevo estado del postulante",
                },
              },
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
          description: "Filtrar grupos cuyo nombre contenga este valor"
        }
      ],
      responses: {
        200: {
          description: "Lista de grupos",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Group" }
              }
            }
          }
        },
        400: {
          description: "Error en la petición",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "Error message aquí" },
                  innerExpression: { type: "string", nullable: true }
                }
              }
            }
          }
        }
      }
    }
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
              schema: { $ref: "#/components/schemas/Group" }
            }
          }
        },
        404: {
          description: "Grupo no encontrado"
        }
      }
    },
  },
  "/api/group/delete":{
      delete: {
      summary: "Eliminar un grupo por ID",
      tags: ["Groups"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" }
        }
      ],
      responses: {
        204: {
          description: "Grupo eliminado correctamente"
        },
        404: {
          description: "Grupo no encontrado"
        }
      }
    }
  },
  "/api/groups/deleteUserFromGroup": {
    delete: {
      summary: "Eliminar un usuario de un grupo",
      tags: ["Groups"],
      parameters: [
        {
          name: "groupId",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del grupo del que se quiere eliminar el usuario"
        },
        {
          name: "userId",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del usuario que se quiere eliminar"
        }
      ],
      responses: {
        200: {
          description: "Usuario eliminado del grupo correctamente",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "Usuario eliminado del grupo correctamente" }
                }
              }
            }
          }
        },
        400: {
          description: "Error en los parámetros o petición",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "No se ha proporcionado un ID para el grupo" },
                  innerExpression: { type: "string", nullable: true }
                }
              }
            }
          }
        },
        404: {
          description: "Grupo no encontrado",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "Grupo no encontrado" }
                }
              }
            }
          }
        }
      }
    }
  },
  // AREAS ENDPOINTS FOR SWAGGER
 "/api/area/create": {
    post: {
      summary: "Crear un área",
      tags: ["Areas"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name"],
              properties: {
                name: { type: "string", example: "Área 51" }
              }
            }
          }
        }
      },
      responses: {
        201: {
          description: "Área creada",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Area" }
            }
          }
        },
        400: {
          description: "Error de validación",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                  innerExpression: { type: "string", nullable: true }
                }
              }
            }
          }
        }
      }
    }
  },
  "/api/area/delete": {
    delete: {
      summary: "Eliminar un área",
      tags: ["Areas"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del área a eliminar"
        }
      ],
      responses: {
        200: {
          description: "Área eliminada correctamente",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "Area eliminado correctamente" }
                }
              }
            }
          }
        },
        404: {
          description: "Área no encontrado",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "Area no encontrado" }
                }
              }
            }
          }
        },
        400: {
          description: "Error en la petición",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                  innerExpression: { type: "string", nullable: true }
                }
              }
            }
          }
        }
      }
    }
  },
  "/api/area/getAllNoPage": {
    get: {
      summary: "Obtener todas las áreas sin paginación",
      tags: ["Areas"],
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Lista de áreas",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Area" }
              }
            }
          }
        },
        400: {
          description: "Error en la petición",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                  innerExpression: { type: "string", nullable: true }
                }
              }
            }
          }
        }
      }
    }
  },
  "/api/area/getById": {
    get: {
      summary: "Obtener un área por ID",
      tags: ["Areas"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del área"
        }
      ],
      responses: {
        200: {
          description: "Área encontrada",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Area" }
            }
          }
        },
        404: {
          description: "Área no encontrada",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "Area no encontrado" }
                }
              }
            }
          }
        },
        400: {
          description: "Error en la petición",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                  innerExpression: { type: "string", nullable: true }
                }
              }
            }
          }
        }
      }
    }
  },
  "/api/area/update": {
    put: {
      summary: "Actualizar un área",
      tags: ["Areas"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "ID del área a actualizar"
        }
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name"],
              properties: {
                name: { type: "string", example: "Área actualizada" }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: "Área actualizada",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Area" }
            }
          }
        },
        400: {
          description: "Error en la petición",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                  innerExpression: { type: "string", nullable: true }
                }
              }
            }
          }
        }
      }
    }
  }
};
