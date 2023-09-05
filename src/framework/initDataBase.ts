import { setupModels } from '../api/v1/models';
import { config } from './config/config';

import { Sequelize } from 'sequelize';

const USER: string = encodeURIComponent(config.dbUser || '');

const PASSWORD: string = encodeURIComponent(config.dbPassword || '');

const URL = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URL, {
  dialect: 'postgres',
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection with DataBase has been established successfully.');
  } catch (error) {
    console.log('Unable to connect to the database:', error);
  }
})();

setupModels(sequelize);

export { sequelize };
