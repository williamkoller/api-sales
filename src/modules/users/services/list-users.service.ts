import AppError from '@shared/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { getCustomRepository } from 'typeorm';
import User from '@modules/users/typeorm/entities/user';
import { UsersRepository } from '@modules/users/typeorm/repositories/users.repository';

export class ListUsersService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository);
    const users = await usersRepository.find();

    if (!users?.length) {
      throw new AppError('No record found.', StatusCodes.NOT_FOUND);
    }

    return users;
  }
}
