Contract: {
  type: "object",
  required: ["empleados", "tittle", "description", "content", "type_contract", "status"],
  properties: {
    empleados: {
      type: "string",
      example: "64e8f5e12345678901234567",
    },
    tittle: {
      type: "string",
      example: "Contrato indefinido",
    },
    description: {
      type: "string",
      example: "Contrato para desarrollador senior",
    },
    content: {
      type: "string",
      example: "El contrato incluye todas las cláusulas estipuladas en el acuerdo general entre las partes...",
    },
    type_contract: {
      type: "string",
      example: "64e8f5e12345678901234568",
    },
    status: {
      type: "string",
      example: "activo",
    },
    signatures: {
      type: "string",
      example: "64e8f5e12345678901234569",
    },
  },
},


"/api/contracts/create": {
  post: {
    summary: "Crear contrato",
    tags: ["Contract"],
    security: [{ bearerAuth: [] }],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Contract",
          },
        },
      },
    },
    responses: {
      "201": {
        description: "Contrato creado exitosamente",
      },
      "400": {
        description: "Faltan campos obligatorios",
      },
    },
  },
},
"/api/contracts/getAll": {
  get: {
    summary: "Listar todos los contratos",
    tags: ["Contract"],
    security: [{ bearerAuth: [] }],
    responses: {
      "200": {
        description: "Lista de contratos",
      },
      "500": {
        description: "Error del servidor",
      },
    },
  },
},
"/api/contracts/getById": {
  get: {
    summary: "Obtener contrato por ID",
    tags: ["Contract"],
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: "id",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "ID del contrato",
      },
    ],
    responses: {
      "200": {
        description: "Contrato encontrado",
      },
      "400": {
        description: "ID inválido",
      },
      "404": {
        description: "Contrato no encontrado",
      },
    },
  },
},
"/api/contracts/update": {
  put: {
    summary: "Actualizar contrato",
    tags: ["Contract"],
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: "id",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "ID del contrato a actualizar",
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Contract",
          },
        },
      },
    },
    responses: {
      "200": {
        description: "Contrato actualizado",
      },
      "400": {
        description: "Datos inválidos",
      },
    },
  },
},
"/api/contracts/delete": {
  delete: {
    summary: "Eliminar contrato",
    tags: ["Contract"],
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: "id",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
        description: "ID del contrato a eliminar",
      },
    ],
    responses: {
      "200": {
        description: "Contrato eliminado",
      },
      "400": {
        description: "ID inválido",
      },
      "404": {
        description: "Contrato no encontrado",
      },
    },
  },
},


/// Solicitudes Swagger

"/api/request/create": {
  post: {
    summary: "Crear solicitud",
    tags: ["Solicitud"],
    security: [{ bearerAuth: [] }],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Solicitud"
          }
        }
      }
    },
    responses: {
      "201": {
        description: "Solicitud creada exitosamente"
      },
      "400": {
        description: "Faltan campos obligatorios o formato inválido"
      },
      "500": {
        description: "Error del servidor"
      }
    }
  }
},

"/api/request/getAll": {
  get: {
    summary: "Listar todas las solicitudes (con filtros opcionales)",
    tags: ["Solicitud"],
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: "title",
        in: "query",
        schema: { type: "string" },
        description: "Filtrar por título"
      },
      {
        name: "status",
        in: "query",
        schema: { type: "string" },
        description: "Filtrar por estado"
      },
      {
        name: "type_request",
        in: "query",
        schema: { type: "string" },
        description: "Filtrar por tipo de solicitud"
      }
    ],
    responses: {
      "200": {
        description: "Lista de solicitudes"
      },
      "500": {
        description: "Error del servidor"
      }
    }
  }
},

"/api/request/getById": {
  get: {
    summary: "Obtener solicitud por ID",
    tags: ["Solicitud"],
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: "id",
        in: "query",
        required: true,
        schema: {
          type: "string"
        },
        description: "ID de la solicitud"
      }
    ],
    responses: {
      "200": {
        description: "Solicitud encontrada"
      },
      "400": {
        description: "ID inválido"
      },
      "404": {
        description: "Solicitud no encontrada"
      }
    }
  }
},

"/api/request/update": {
  put: {
    summary: "Actualizar solicitud",
    tags: ["Solicitud"],
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: "id",
        in: "query",
        required: true,
        schema: {
          type: "string"
        },
        description: "ID de la solicitud a actualizar"
      }
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Solicitud"
          }
        }
      }
    },
    responses: {
      "200": {
        description: "Solicitud actualizada correctamente"
      },
      "400": {
        description: "Datos inválidos o ID incorrecto"
      },
      "404": {
        description: "Solicitud no encontrada"
      }
    }
  }
},

"/api/request/delete": {
  delete: {
    summary: "Eliminar solicitud",
    tags: ["Solicitud"],
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: "id",
        in: "query",
        required: true,
        schema: {
          type: "string"
        },
        description: "ID de la solicitud a eliminar"
      }
    ],
    responses: {
      "200": {
        description: "Solicitud eliminada exitosamente"
      },
      "400": {
        description: "ID inválido"
      },
      "404": {
        description: "Solicitud no encontrada"
      },
    },
  },
},
