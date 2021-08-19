import { CreateSessionService } from '@modules/users/services/create-session.service';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export default class SessionsController {
  /**
   * @param {Request} request
   * @param {Response} response
   * @return {*}  {Promise<Response>}
   * @memberof SessionsController
   */
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const createSessionService = new CreateSessionService();
    const sessionCreated = await createSessionService.execute({
      email,
      password,
    });
    return response.status(StatusCodes.OK).json(sessionCreated);
  }
}
