import { UsersRepository } from '@modules/users/typeorm/repositories/users.repository';
import User from '@modules/users/typeorm/entities/user';
import AppError from '@shared/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { getCustomRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { comparerHasher } from '@utils/cryptography/comparer-hasher/comparer-hasher';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

interface IPayload {
  id: string;
  name: string;
}

export class CreateSessionService {
  /**
   * @param {IRequest} { email, password }
   * @return {*}  {Promise<IResponse>}
   * @memberof CreateSessionService
   */
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError(
        'Incorret email or password combination.',
        StatusCodes.UNAUTHORIZED,
      );
    }

    const isValid = comparerHasher(password, user.password);

    if (!isValid) {
      throw new AppError(
        'Incorret email or password combination.',
        StatusCodes.UNAUTHORIZED,
      );
    }

    const payload: IPayload = {
      id: user.id,
      name: user.name,
    };

    const token = sign(payload, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
