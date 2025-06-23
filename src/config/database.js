require('dotenv').config();

module.exports = {
  dialect: process.env.DB_DIALECT || 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  
  // Adicione esta linha para uma saída de teste mais limpa
  logging: false, 
  
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};