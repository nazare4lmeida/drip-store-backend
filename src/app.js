require('dotenv').config();
require('./database');

const express = require('express');
const cors = require('cors'); // 1. Importe o pacote

const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
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