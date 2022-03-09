import { EntityRepository, Repository } from 'typeorm';
import Customer from '@modules/customers/typeorm/entities/customer';

@EntityRepository(Customer)
export class CustomersRepository extends Repository<Customer> {}
