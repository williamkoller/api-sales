import { getCustomRepository } from 'typeorm';
import Customer from '@modules/customers/typeorm/entities/customer';
import { CustomersRepository } from '@modules/customers/typeorm/repositories/customers.repository';
import AppError from '@shared/errors/AppError';
import { StatusCodes } from 'http-status-codes';

interface IRequest {
  name: string;
  email: string;
}

export class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const emailExists = await customersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.', StatusCodes.CONFLICT);
    }

    const customerCreated = customersRepository.create({
      name,
      email,
    });

    return await customersRepository.save(customerCreated);
  }
}
