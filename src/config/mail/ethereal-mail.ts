import nodemailer from 'nodemailer';
import mailConfig from '@config/mail';
import HandlebarsMailTemplate, {
  IParseMailTemplate,
} from './handlebars-mail-template';

interface IMailContact {
  name: string;
  email: string;
}

interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export default class EtherealMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail): Promise<void> {
    const mailTemplate = new HandlebarsMailTemplate();
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
      from: {
        name: from?.name || 'Team API Sales',
        address: from?.email || 'no_reply@api_sales.com',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
