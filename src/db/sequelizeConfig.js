require('dotenv').config({ path: '../../.env' });
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.NODE_ENV === 'test' ? ':memory:' : process.env.DB_PATH,
  logging: console.log,
});

(async () => {
  try {
    await sequelize.sync({ force: false }); // Cambia a `true` si deseas reiniciar la base de datos
    console.log('Database synced');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
})();

module.exports = sequelize;
