import { Components, Paths } from 'swagger-jsdoc';

export const swaggerComponents: Components = {
  schemas: {
    RegisterForm: {
      type: 'object',
      required: [
        'firstName',
        'middleName',
        'lastName',
        'secondLastName',
        'email',
        'password',
        'confirmPassword'
      ],
      properties: {
        firstName: {
          type: 'string',
          description: 'User\'s first name'
        },
        middleName: {
          type: 'string',
          description: 'User\'s middle name'
        },
        lastName: {
          type: 'string',
          description: 'User\'s last name'
        },
        secondLastName: {
          type: 'string',
          description: 'User\'s second last name'
        },
        email: {
          type: 'string',
          format: 'email',
          description: 'User\'s email'
        },
        password: {
          type: 'string',
          format: 'password',
          description: 'User\'s password'
        },
        confirmPassword: {
          type: 'string',
          format: 'password',
          description: 'Password confirmation'
        }
      }
    },
    LoginCredentials: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: {
          type: 'string',
          format: 'email',
          description: 'User\'s email'
        },
        password: {
          type: 'string',
          format: 'password',
          description: 'User\'s password'
        }
      }
    },
    User: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          format: 'email'
        },
        photo: {
          type: 'string'
        }
      }
    }
  }
};

export const swaggerPaths: Paths = {
  '/api/login/login': {
    post: {
      summary: 'User login',
      tags: ['Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/LoginCredentials'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Successful login',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  user: {
                    $ref: '#/components/schemas/User'
                  },
                  token: {
                    type: 'string'
                  }
                }
              }
            }
          }
        },
        400: {
          description: 'Invalid credentials or user not found'
        }
      }
    }
  },
  '/api/login/register': {
    post: {
      summary: 'Register new user',
      tags: ['Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/RegisterForm'
            }
          }
        }
      },
      responses: {
        201: {
          description: 'User created successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/RegisterForm'
              }
            }
          }
        },
        400: {
          description: 'Error in provided data'
        }
      }
    }
  }
};