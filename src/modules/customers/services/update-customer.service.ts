import AppError from '@shared/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { getCustomRepository } from 'typeorm';
import { CustomersRepository } from '../typeorm/repositories/customers.repository';
import Customer from '../typeorm/entities/customer';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

export class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    let customerData: Customer | undefined;
    const customersRepository = getCustomRepository(CustomersRepository);
    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.', StatusCodes.NOT_FOUND);
    }

    customerData = await customersRepository.findByEmail(email);

    if (customerData && email !== customer.email) {
      throw new AppError(
        'There is already on customer with this email.',
        StatusCodes.CONFLICT,
      );
    }

    customer.name = name;
    customer.email = email;

    await customersRepository.save(customer);

    return customer;
  }
}
