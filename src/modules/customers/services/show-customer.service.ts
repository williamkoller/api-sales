import AppError from '@shared/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { getCustomRepository } from 'typeorm';
import Customer from '@modules/customers/typeorm/entities/customer';
import { CustomersRepository } from '@modules/customers/typeorm/repositories/customers.repository';

interface IRequest {
  id: string;
}

export class ShowCustomerService {
  public async execute({ id }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.', StatusCodes.NOT_FOUND);
    }

    return customer;
  }
}
