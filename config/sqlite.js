const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
});

const connectSQLite = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('SQLite connected and synced successfully.');
  } catch (error) {
    console.error('SQLite connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectSQLite };
