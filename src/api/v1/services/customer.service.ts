import { FindOptions, Sequelize } from 'sequelize';
import { sequelize } from '../../../framework/initDataBase';
import * as boom from '@hapi/boom';
import QueryString from 'qs';
import { customerInput } from '../models/customer.model';

class CustomerService {
  sequelizeConection: Sequelize;
  model;
  associations: string[];

  constructor() {
    this.sequelizeConection = sequelize;
    this.model = this.sequelizeConection.models.customer;
    this.associations = ['user'];
  }

  async findOneCustomer(id: number) {
    const customer = await this.model.findByPk(id, {
      include: [
        {
          association: this.associations[0],
          attributes: { exclude: ['password'] },
        },
      ],
    });

    if (!customer) {
      throw boom.badRequest('customer does not exist');
    }

    return customer;
  }

  async findAllCustomer(query: QueryString.ParsedQs) {
    const options: FindOptions = {
      include: this.associations,
      limit: 30,
      offset: 0,
      attributes: { exclude: ['password'] },
    };

    const { limit, offset, country } = query;

    if (limit && offset) {
      options.limit = parseInt(limit as string);
      options.offset = parseInt(offset as string);
    }

    if (country) {
      const where = {
        ...(country !== undefined && { country }),
      };

      options.where = where;
    }

    const customers = await this.model.findAll(options);

    if (customers.length <= 0) {
      throw boom.badRequest();
    }
    return customers;
  }

  async createCustomer(data: customerInput) {
    if (!data) {
      throw boom.badRequest();
    }
    const newCustomer = await this.model.create(data);

    if (!newCustomer) {
      throw boom.badRequest('the customer was not created');
    }

    return newCustomer;
  }

  async deleteCustomer(id: number) {
    const customer = await this.findOneCustomer(id);

    customer.destroy();
  }

  async updateCustomer(id: number, props: customerInput) {
    const customer = await this.findOneCustomer(id);

    const newCustomer = await customer.update(props);

    return newCustomer;
  }

  async isAvaliblseNumber(number: number) {
    const customer = await this.model.findOne({
      where: { cellPhoneNumber: number },
    });

    if (!customer) {
      return false;
    }

    return true;
  }
}

export { CustomerService };
