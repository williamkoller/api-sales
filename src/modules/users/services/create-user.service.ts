import { UsersRepository } from '@modules/users/typeorm/repositories/users.repository';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/typeorm/entities/user';
import { StatusCodes } from 'http-status-codes';
import { getCustomRepository } from 'typeorm';
import { hashPassword } from 'src/utils/hash-password';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  /**
   * @param {IRequest} { name, email, password }
   * @return {*}  {Promise<User>}
   * @memberof CreateUserService
   */
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userExists = await usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('Email address already used.', StatusCodes.CONFLICT);
    }

    const hash = hashPassword(password);

    const user = usersRepository.create({
      name,
      email,
      password: hash,
    });

    await usersRepository.save(user);

    return user;
  }
}
