import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ResetPasswordService } from '../services/reset-password.service';

export default class ResetPasswordController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response<void>> {
    const { token, password } = request.body;

    const resetPassword = new ResetPasswordService();

    await resetPassword.execute({ token, password });

    return response.status(StatusCodes.NO_CONTENT).json();
  }
}
