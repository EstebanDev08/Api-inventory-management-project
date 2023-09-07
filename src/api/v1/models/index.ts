import { Sequelize } from 'sequelize';
import { User, userSchema } from './user.model';

const setupModels = (sequelize: Sequelize) => {
  User.init(userSchema, User.config(sequelize));

  console.log(sequelize.models);
};

export { setupModels };
