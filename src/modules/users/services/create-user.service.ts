import User from '@modules/users/typeorm/entities/user';
import { CreateUserType } from '@modules/users/@types/create-user/create-user.type';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/users.repository';
import AppError from '@shared/errors/AppError';
import { hashSync, genSaltSync } from 'bcrypt';
import { StatusCodes } from 'http-status-codes';

export class CreateUserService {
  public async execute({
    name,
    email,
    password,
  }: CreateUserType): Promise<User> {
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
