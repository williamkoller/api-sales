import Customer from '@modules/customers/typeorm/entities/customer';
import AppError from '@shared/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { getCustomRepository } from 'typeorm';
import { CustomersRepository } from '@modules/customers/typeorm/repositories/customers.repository';

export class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const customers = await customersRepository.find();

    if (!customers.length) {
      throw new AppError('No record found.', StatusCodes.NOT_FOUND);
    }

    return customers;
  }
}
