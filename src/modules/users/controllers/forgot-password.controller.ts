import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { SendForgotPasswordEmailService } from '../services/send-forgot-password-email.service';

export default class ForgotPasswordController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response<void>> {
    const { email } = request.body;

    const sendForgotPasswordemail = new SendForgotPasswordEmailService();

    await sendForgotPasswordemail.execute(email);

    return response.status(StatusCodes.NO_CONTENT).json();
  }
}
