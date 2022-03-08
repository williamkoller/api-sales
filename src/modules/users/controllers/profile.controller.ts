import User from '@modules/users/typeorm/entities/user';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ShowProfileService } from '../services/show-profile.service';
import { UpdateProfileService } from '../services/update-profile.service';

export default class ProfileController {
  public async show(
    request: Request,
    response: Response,
  ): Promise<Response<User[]>> {
    const showProfile = new ShowProfileService();
    const userId = request.user.id;
    const user = await showProfile.execute({ userId });

    return response.status(StatusCodes.OK).json(user);
  }

  public async update(
    request: Request,
    response: Response,
  ): Promise<Response<User>> {
    const { name, email, password, oldPassword } = request.body;
    const userId = request.user.id;

    const updateProfileService = new UpdateProfileService();
    const userUpdated = await updateProfileService.execute({
      userId,
      name,
      email,
      password,
      oldPassword,
    });
    return response.status(StatusCodes.OK).json(userUpdated);
  }
}
