const app = require('./app');
// 1. Importe a instância da classe Database
const database = require('./database');

const PORT = process.env.PORT || 3001;

// 2. Sincronize o banco de dados usando a propriedade 'connection' e depois inicie o servidor
database.connection.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`\n✅ Servidor rodando na porta ${PORT}`);
    console.log('✅ Banco de dados sincronizado com sucesso.');
  });
}).catch(err => {
  console.error('❌ Não foi possível sincronizar o banco de dados:', err);
});