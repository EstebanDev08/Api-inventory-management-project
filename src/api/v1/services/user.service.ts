import { FindOptions, Sequelize } from 'sequelize';
import { sequelize } from '../../../framework/initDataBase';
import * as Boom from '@hapi/boom';
import QueryString from 'qs';
import { UserInput } from '../models/user.model';

class UserService {
  sequelizeConection: Sequelize;
  model;
  associations: never[];

  constructor() {
    this.sequelizeConection = sequelize;
    this.model = this.sequelizeConection.models.user;
    this.associations = [];
  }

  async findOneUser(id: number) {
    const user = await this.model.findByPk(id);

    if (!user) {
      throw Boom.notFound(' Username does not exist ');
    }

    return user;
  }

  async findUsers(query: QueryString.ParsedQs) {
    const options: FindOptions = {
      include: this.associations,
      limit: 30,
      offset: 0,
    };

    const { limit, offset } = query;

    if (limit && offset) {
      options.limit = parseInt(limit as string);
      options.offset = parseInt(offset as string);
    }

    const users = await this.model.findAll(options);

    if (users.length <= 0) {
      throw Boom.notFound('No data found');
    }

    return users;
  }

  async createUser(data: UserInput) {
    const newUser = await this.model.create(data);

    if (!data) {
      throw Boom.badRequest();
    }

    return newUser;
  }
}

export { UserService };
