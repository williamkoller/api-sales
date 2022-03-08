import AppError from '@shared/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { getCustomRepository } from 'typeorm';
import User from '@modules/users/typeorm/entities/user';
import { UsersRepository } from '@modules/users/typeorm/repositories/users.repository';

interface IRequest {
  userId: string;
}

export class ShowProfileService {
  public async execute({ userId }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found.');
    }

    return user;
  }
}
