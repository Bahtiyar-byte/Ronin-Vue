
const dev_db_port = process.env?.DEV_DB_PORT ?? 5432

module.exports = {
  production: {
    dialect: 'postgres',
    username: 'postgres',
    password: 'postgres',
    database: 'db_evans_crm',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || dev_db_port,
    logging: console.log,
    seederStorage: 'sequelize',
  },
  development: {
    username: 'postgres',
    dialect: 'postgres',
    password: 'postgres',
    database: 'db_evans_crm',
    host: process.env.DEV_DB_HOST || 'localhost',
    port: dev_db_port,
    logging: console.log,
    seederStorage: 'sequelize',
  },
};
