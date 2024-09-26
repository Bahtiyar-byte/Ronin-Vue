
const dev_db_port = process.env?.DEV_DB_PORT ?? 5432

module.exports = {
  production: {
    dialect: 'postgres',
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
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
