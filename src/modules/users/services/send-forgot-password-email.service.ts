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

    const { token } = await userTokensRepository.generateToken(user.id);

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API SALES] password recovery',
      templateData: {
        template: `Hello {{name}}: {{token}}`,
        variables: {
          name: user.name,
          token,
        },
      },
    });
  }
}
