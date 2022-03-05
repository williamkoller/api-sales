import nodemailer from 'nodemailer';

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
        user: 'b6ede333116e68',
        pass: 'f1731f5092a7f3',
      },
      logger: true,
    });

    const message = await transporter.sendMail({
      from: 'williamkoller30@gmail.com',
      to,
      subject: 'Recuperacao de senha',
      text: body,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
