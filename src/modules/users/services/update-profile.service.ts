import AppError from '@shared/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { getCustomRepository } from 'typeorm';
import User from '@modules/users/typeorm/entities/user';
import { UsersRepository } from '@modules/users/typeorm/repositories/users.repository';
import { compare } from 'bcrypt';
import { hashPassword } from 'src/utils/hash-password';

interface IRequest {
  userId: string;
  name: string;
  email: string;
  password?: string;
  oldPassword?: string;
}

export class UpdateProfileService {
  public async execute({
    userId,
    name,
    email,
    password,
    oldPassword,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found.');
    }

    const userUpdateEmail = await usersRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== userId) {
      throw new AppError('There is already on user with this email.');
    }

    if (password && !oldPassword) {
      throw new AppError('Old password is required.');
    }

    if (password && oldPassword) {
      const checkOldPassword = await compare(oldPassword, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }

      user.password = hashPassword(password);
    }

    user.name = name;
    user.email = email;

    await usersRepository.save(user);

    return user;
  }
}
