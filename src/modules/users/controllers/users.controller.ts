import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreateUserService } from '@modules/users/services/create-user.service';
import { ListUsersService } from '@modules/users/services/list-users.service';
import User from '@modules/users/typeorm/entities/user';

export default class UsersController {
  public async index(
    request: Request,
    response: Response,
  ): Promise<Response<User[]>> {
    const listUsersService = new ListUsersService();
    const users = await listUsersService.execute();
    return response.status(StatusCodes.OK).json(users);
  }

  public async create(
    request: Request,
    response: Response,
  ): Promise<Response<User>> {
    const { name, email, password } = request.body;
    const createUserService = new CreateUserService();
    const userCreated = await createUserService.execute({
      name,
      email,
      password,
    });
    return response.status(StatusCodes.CREATED).json(userCreated);
  }
}
