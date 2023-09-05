/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');

dotenv.config();

const config = {
  env: process.env.NODE_ENV ?? 'dev',
  dbPort: process.env.DB_PORT ?? 3000,
  dbUsers: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
};

const USER = encodeURIComponent(config.dbUsers ?? '');
const PASSWORD = encodeURIComponent(config.dbPassword ?? '');

const URL = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

module.exports = {
  development: {
    url: URL,
    dialect: 'postgres',
  },

  /*
  production: {
    username: 'your_production_username',
    password: 'your_production_password',
    database: 'your_production_database',
    host: 'your_production_host',
    dialect: 'postgres',
  },*/
};
