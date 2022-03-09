import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreateCustomerService } from '../services/create-customer.service';
import { DeleteCustomerService } from '../services/delete-customer.service';
import { ListCustomerService } from '../services/list-customer.service';
import { ShowCustomerService } from '../services/show-customer.service';
import { UpdateCustomerService } from '../services/update-customer.service';
import Customer from '../typeorm/entities/customer';

export default class CustomersController {
  public async index(
    request: Request,
    response: Response,
  ): Promise<Response<Customer[]>> {
    const listCustomerService = new ListCustomerService();
    const customers = await listCustomerService.execute();
    return response.status(StatusCodes.OK).json(customers);
  }

  public async create(
    request: Request,
    response: Response,
  ): Promise<Response<Customer>> {
    const { name, email } = request.body;
    const createCustomerService = new CreateCustomerService();
    const customerCreated = await createCustomerService.execute({
      name,
      email,
    });
    return response.status(StatusCodes.CREATED).json(customerCreated);
  }

  public async show(
    request: Request,
    response: Response,
  ): Promise<Response<Customer>> {
    const { id } = request.params;
    const showCustomerService = new ShowCustomerService();
    const customer = showCustomerService.execute({ id });
    return response.status(StatusCodes.OK).json(customer);
  }

  public async update(
    request: Request,
    response: Response,
  ): Promise<Response<Customer>> {
    const { name, email } = request.body;
    const { id } = request.params;
    const updateCustomerService = new UpdateCustomerService();
    const customerUpdate = updateCustomerService.execute({ id, name, email });
    return response.status(StatusCodes.OK).json(customerUpdate);
  }

  public async delete(
    request: Request,
    response: Response,
  ): Promise<Response<void>> {
    const { id } = request.params;
    const deleteCustomerService = new DeleteCustomerService();
    const customer = deleteCustomerService.execute({ id });
    return response.status(StatusCodes.NO_CONTENT).json(customer);
  }
}
