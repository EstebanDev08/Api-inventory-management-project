import { NextFunction, Request, Response } from 'express';
import { CustomerService } from '../services/customer.service';

const customerService = new CustomerService();

class CustomerController {
  static async getOneCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const customer = await customerService.findOneCustomer(
        parseInt(id as string)
      );

      res.json(customer);
    } catch (error) {
      next(error);
    }
  }

  static async getAllCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query;

      const customers = await customerService.findAllCustomer(query);

      res.json(customers);
    } catch (error) {
      next(error);
    }
  }

  static async createCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const newCustomer = await customerService.createCustomer(data);
      res.json(newCustomer);
    } catch (error) {
      next(error);
    }
  }

  static async updateCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const props = req.body;

      const updatedCustomer = await customerService.updateCustomer(
        parseInt(id as string),
        props
      );

      res.json(updatedCustomer);
    } catch (error) {
      next(error);
    }
  }

  static async deleteCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await customerService.deleteCustomer(parseInt(id));

      res.status(204);
    } catch (error) {
      next(error);
    }
  }
}

export { CustomerController };
