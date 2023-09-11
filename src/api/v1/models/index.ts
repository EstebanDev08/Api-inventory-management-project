import { Sequelize } from 'sequelize';
import { User, userSchema } from './user.model';
import { Customer, customerSchema } from './customer.model';

const setupModels = (sequelize: Sequelize) => {
  User.init(userSchema, User.config(sequelize));
  Customer.init(customerSchema, Customer.config(sequelize));

  //associations
  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  console.log(sequelize.models);
};

export { setupModels };
