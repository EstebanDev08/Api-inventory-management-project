import { Sequelize } from 'sequelize';

const setupModels = (sequelize: Sequelize) => {
  console.log(sequelize.models);
};

export { setupModels };
