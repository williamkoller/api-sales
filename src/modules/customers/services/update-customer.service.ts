import AppError from '@shared/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { getCustomRepository } from 'typeorm';
import User from '@modules/users/typeorm/entities/user';
import { UsersRepository } from '@modules/users/typeorm/repositories/users.repository';
import { compare } from 'bcrypt';
import { hashPassword } from 'src/utils/hash-password';
import { CustomersRepository } from '../typeorm/repositories/customers.repository';
import Customer from '../typeorm/entities/customer';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

export class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.', StatusCodes.NOT_FOUND);
    }

    const customerEmail = await customersRepository.findByEmail(email);

    if (customerEmail && email !== customerEmail.email) {
      throw new AppError('There is already on customer with this email.');
    }

    customer.name = name;
    customer.email = email;

    await customersRepository.save(customer);

    return customer;
  }
}
