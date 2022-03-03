import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UserTokensRepository } from '../typeorm/repositories/user-tokens.repository';
import { UsersRepository } from '../typeorm/repositories/users.repository';
import { isAfter, addHours } from 'date-fns';
import { genSaltSync, hashSync } from 'bcrypt';
import { hashPassword } from 'src/utils/hash-password';

interface IRequest {
  token: string;
  password: string;
}

export class ResetPasswordService {
  private TWO_HOURS = 2;
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const userToken = await userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists.');
    }

    const user = await usersRepository.findById(userToken.userId);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const tokenCreatedAt = userToken.createdAt;

    const compareDate = addHours(tokenCreatedAt, this.TWO_HOURS);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.');
    }

    user.password = hashPassword(password);
  }
}
