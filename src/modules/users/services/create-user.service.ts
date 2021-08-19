import { UsersRepository } from '@modules/users/typeorm/repositories/users.repository';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/typeorm/entities/user';
import { StatusCodes } from 'http-status-codes';
import { hashSync, genSaltSync } from 'bcrypt';
import { getCustomRepository } from 'typeorm';

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

    const salt = genSaltSync();
    const hash = hashSync(password, salt);

    const user = usersRepository.create({
      name,
      email,
      password: hash,
    });

    await usersRepository.save(user);

    return user;
  }
}
