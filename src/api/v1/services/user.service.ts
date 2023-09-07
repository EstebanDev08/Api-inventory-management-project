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
    const user = await this.model.findByPk(id, {
      attributes: { exclude: ['password'] },
    });

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
      attributes: { exclude: ['password'] },
    };

    const { limit, offset, rol, isActive } = query;

    if (limit && offset) {
      options.limit = parseInt(limit as string);
      options.offset = parseInt(offset as string);
    }

    if (rol || isActive) {
      const where = {
        ...(rol !== undefined && { rol }),
        ...(isActive !== undefined && { isActive }),
      };

      options.where = where;
    }

    const users = await this.model.findAll(options);

    if (users.length <= 0) {
      throw Boom.notFound('No data found');
    }

    return users;
  }

  async createUser(data: UserInput) {
    await this.isEmailUnique(data.email);

    const newUser = await this.model.create(data);

    delete newUser?.dataValues?.password;

    return newUser;
  }

  async isEmailUnique(email: string) {
    const user = await this.model.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      throw Boom.badRequest('email already exist');
    }
    // Si usuarioExistente es null, el correo electrónico es único
    // Si usuarioExistente no es null, el correo electrónico ya está en uso
    return !user;
  }
}

export { UserService };
