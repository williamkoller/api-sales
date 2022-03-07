import EtherealMail from '@config/mail/ethereal-mail';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UserTokensRepository } from '../typeorm/repositories/user-tokens.repository';
import { UsersRepository } from '../typeorm/repositories/users.repository';

interface IRequest {
  email: string;
}

export class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const user = await usersRepository.findByEmailForgot(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const userToken = await userTokensRepository.generateToken(user.id);

    await EtherealMail.sendMail({
      to: user.email,
      body: `Received password reset request: ${userToken?.token}`,
    });
  }
}
