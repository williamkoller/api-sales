import nodemailer from 'nodemailer';
import mailConfig from '@config/mail';

interface ISendMail {
  to: string;
  body: string;
}

export default class EtherealMail {
  static async sendMail({ to, body }: ISendMail): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      service: 'mailtrap',
      port: 2525,
      auth: {
        user: mailConfig.user,
        pass: mailConfig.pass,
      },
      logger: true,
    });

    const message = await transporter.sendMail({
      from: 'no_reply@api_sales.com',
      to,
      subject: '[API-SALES] - password recovery',
      text: body,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
