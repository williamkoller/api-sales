import User from '@modules/users/typeorm/entities/user';
import { Request, Response } from 'express';
import { UpdateUserAvatarService } from '../services/update-user-avatar.service'

export default class UserAvatarController {
  public async update(
    request: Request,
    response: Response,
  ): Promise<Response<User>> {
    const updateAvatar = new UpdateUserAvatarService();
    
    const user = updateAvatar.execute({
      userId: request.user.id,
      avatarFilename: request.file?.fieldname,
    });

    return response.json(user);
  }
}
