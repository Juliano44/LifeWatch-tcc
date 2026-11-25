import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Dashboard de Saúde — API',
      version: '1.0.0',
      description:
        'API do backend do Dashboard de Saúde (TCC): autenticação de usuários e armazenamento dos dados pessoais de saúde exibidos no frontend.',
    },
    servers: [{ url: '/api', description: 'Servidor local' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

export const swaggerSpec = swaggerJsdoc(options);
