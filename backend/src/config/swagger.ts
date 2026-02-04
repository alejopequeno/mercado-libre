/**
 * OpenAPI (Swagger) Configuration
 */

export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'MercadoLibre Clone API',
    version: '1.0.0',
    description: 'RESTful API for MercadoLibre item detail page prototype',
    contact: {
      name: 'API Support',
      email: 'support@example.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:3001',
      description: 'Development server',
    },
  ],
  tags: [
    {
      name: 'Products',
      description: 'Product endpoints',
    },
  ],
  paths: {
    '/api/products': {
      get: {
        tags: ['Products'],
        summary: 'Get all products',
        description: 'Retrieve a simplified list of all available products',
        operationId: 'getAllProducts',
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/ProductListItem' },
                    },
                    timestamp: { type: 'string', format: 'date-time' },
                  },
                },
              },
            },
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
    },
    '/api/products/{slug}': {
      get: {
        tags: ['Products'],
        summary: 'Get product by slug',
        description: 'Retrieve detailed information about a specific product by its slug',
        operationId: 'getProductBySlug',
        parameters: [
          {
            name: 'slug',
            in: 'path',
            required: true,
            description: 'Product slug (URL-friendly identifier)',
            schema: { type: 'string', example: 'samsung-galaxy-a35-5g' },
          },
        ],
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: { $ref: '#/components/schemas/Product' },
                    timestamp: { type: 'string', format: 'date-time' },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Invalid product slug',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
          '404': {
            description: 'Product not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Product: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'MLA1234567890' },
          title: { type: 'string', example: 'Samsung Galaxy A35 5G' },
          description: { type: 'string' },
          price: { $ref: '#/components/schemas/Price' },
          images: { type: 'array', items: { type: 'string', format: 'uri' } },
          condition: { type: 'string', enum: ['new', 'used'], example: 'new' },
          availableQuantity: { type: 'number', example: 150 },
          soldQuantity: { type: 'number', example: 3450 },
          seller: { $ref: '#/components/schemas/Seller' },
          shipping: { $ref: '#/components/schemas/Shipping' },
          attributes: {
            type: 'array',
            items: { $ref: '#/components/schemas/AttributeCategory' },
          },
          rating: { $ref: '#/components/schemas/Rating' },
          paymentMethods: {
            type: 'array',
            items: { $ref: '#/components/schemas/PaymentMethod' },
          },
          warranty: { type: 'string', example: 'Garantía del vendedor: 12 meses' },
          category: { $ref: '#/components/schemas/Category' },
          questions: {
            type: 'array',
            items: { $ref: '#/components/schemas/Question' },
          },
          reviews: {
            type: 'array',
            items: { $ref: '#/components/schemas/Review' },
          },
        },
      },
      ProductListItem: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'MLA1234567890' },
          title: { type: 'string', example: 'Samsung Galaxy A35 5G' },
          price: { $ref: '#/components/schemas/Price' },
          thumbnail: { type: 'string', format: 'uri' },
          condition: { type: 'string', enum: ['new', 'used'] },
          freeShipping: { type: 'boolean' },
        },
      },
      Price: {
        type: 'object',
        properties: {
          amount: { type: 'number', example: 439 },
          currency: { type: 'string', example: 'USD' },
          originalAmount: { type: 'number', example: 599 },
          discount: { type: 'number', example: 27 },
        },
      },
      Seller: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          nickname: { type: 'string', example: 'TechStore Official' },
          avatarUrl: { type: 'string', format: 'uri', example: 'https://i.pravatar.cc/150?img=12' },
          reputation: { $ref: '#/components/schemas/SellerReputation' },
          registrationDate: { type: 'string', format: 'date-time' },
          totalSales: { type: 'number', example: 28500 },
        },
      },
      SellerReputation: {
        type: 'object',
        properties: {
          level: {
            type: 'string',
            enum: ['red', 'orange', 'yellow', 'light_green', 'green'],
          },
          powerSellerStatus: { type: 'boolean' },
          positivePercentage: { type: 'number', example: 99 },
          transactions: {
            type: 'object',
            properties: {
              total: { type: 'number' },
              completed: { type: 'number' },
              canceled: { type: 'number' },
            },
          },
          metrics: {
            type: 'object',
            properties: {
              goodService: { type: 'boolean', example: true },
              onTimeDelivery: { type: 'boolean', example: true },
            },
          },
        },
      },
      Shipping: {
        type: 'object',
        properties: {
          freeShipping: { type: 'boolean' },
          mode: { type: 'string', enum: ['me2', 'custom'] },
          methods: { type: 'array', items: { type: 'string' } },
          estimatedDelivery: { type: 'string' },
        },
      },
      AttributeValue: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'Marca' },
          value: { type: 'string', example: 'Samsung' },
        },
      },
      AttributeCategory: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'Características generales' },
          values: {
            type: 'array',
            items: { $ref: '#/components/schemas/AttributeValue' },
          },
        },
      },
      Rating: {
        type: 'object',
        properties: {
          average: { type: 'number', example: 4.5 },
          total: { type: 'number', example: 2847 },
        },
      },
      PaymentMethod: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string', example: 'Visa' },
          type: {
            type: 'string',
            enum: ['mercadopago', 'credit_card', 'debit_card', 'bank_transfer', 'cash'],
          },
          installments: {
            type: 'array',
            items: { $ref: '#/components/schemas/Installment' },
          },
        },
      },
      Installment: {
        type: 'object',
        properties: {
          quantity: { type: 'number', example: 3 },
          amount: { type: 'number', example: 146.33 },
          rate: { type: 'number', example: 0 },
        },
      },
      Category: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string', example: 'Celulares y Teléfonos' },
          path: { type: 'array', items: { type: 'string' } },
        },
      },
      Question: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          question: { type: 'string', example: '¿El celular viene liberado?' },
          answer: { type: 'string' },
          askedBy: { type: 'string', example: 'Carlos M.' },
          answeredBy: { type: 'string' },
          askedAt: { type: 'string', format: 'date-time' },
          answeredAt: { type: 'string', format: 'date-time' },
        },
      },
      ReviewCharacteristic: {
        type: 'object',
        properties: {
          label: { type: 'string', example: 'Calidad de la cámara' },
          value: { type: 'number', minimum: 1, maximum: 5, example: 5 },
        },
      },
      Review: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          rating: { type: 'number', minimum: 1, maximum: 5, example: 5 },
          title: { type: 'string' },
          comment: { type: 'string', example: 'Excelente producto' },
          userName: { type: 'string', example: 'Juan Pérez' },
          userAvatar: { type: 'string', format: 'uri' },
          date: { type: 'string', format: 'date-time' },
          likes: { type: 'number', example: 24 },
          images: { type: 'array', items: { type: 'string', format: 'uri' } },
          characteristics: {
            type: 'array',
            items: { $ref: '#/components/schemas/ReviewCharacteristic' },
          },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          error: {
            type: 'object',
            properties: {
              message: { type: 'string' },
              code: { type: 'string' },
              details: { type: 'object' },
            },
          },
          timestamp: { type: 'string', format: 'date-time' },
        },
      },
    },
  },
};
