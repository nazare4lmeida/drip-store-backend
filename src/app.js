require('dotenv').config();
require('./database');

const express = require('express');
const cors = require('cors'); 

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

class App {
  constructor() {
    this.server = express();
    this.swagger();
    this.middlewares();
    this.routes();
  }

  swagger() {
    const swaggerOptions = {
      swaggerDefinition: {
        openapi: '3.0.0', // Especificação OpenAPI
        info: {
          title: 'Drip Store API',
          version: '1.0.0',
          description: 'Documentação da API RESTful para o e-commerce Drip Store',
        },
        servers: [
          {
            url: `http://localhost:${process.env.PORT || 3001}/v1`, // URL base da sua API
          },
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      // Caminho para os arquivos que contêm as anotações da API
      apis: ['./src/routes/*.js'],
    };

    const swaggerDocs = swaggerJSDoc(swaggerOptions);
    this.server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  }

  middlewares() {
    this.server.use(cors()); // 2. Use o middleware aqui
    this.server.use(express.json({ limit: '50mb' }));
  }

  routes() {
    this.server.use('/v1/usuario', userRoutes);
    this.server.use('/v1/categoria', categoryRoutes);
    this.server.use('/v1/produto', productRoutes);
  }
}

module.exports = new App().server;