import { UsersRepository } from '@modules/users/typeorm/repositories/users.repository';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/typeorm/entities/user';
import { getCustomRepository } from 'typeorm';
import path from 'path';
import uploadConfig from '@config/upload';
import { promises } from 'fs';

interface IRequest {
  userId: string;
  avatarFilename: string | undefined;
}

export class UpdateUserAvatarService {
  public async execute({ userId, avatarFilename }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}
