import { createTransport } from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

import { Environment } from '../environment';

interface ISendMailInterface {
  to: string;
  subject: string;
  text: string;
  html: string;
}

class MailSender {
  private transport: any;
  private from: string;
  private host: string;
  private port: number;
  private service: string;
  private authUser: string;
  private authPassword: string;

  constructor() {
    this.from = Environment.getConfig('EMAIL_FROM');
    this.host = Environment.getConfig('EMAIL_HOST');
    this.port = parseInt(Environment.getConfig('EMAIL_PORT'));
    this.service = Environment.getConfig('EMAIL_SERVICE');
    this.authUser = Environment.getConfig('EMAIL_AUTH_USER');
    this.authPassword = Environment.getConfig('EMAIL_AUTH_PASSWORD');

    this.transport = createTransport(
      smtpTransport({
        host: this.host,
        port: this.port,
        service: this.service,
        secure: true,
        auth: {
          user: this.authUser,
          pass: this.authPassword,
        },
        tls: {
          rejectUnauthorized: false,
        },
      })
    );
  }

  async sendMail(data: ISendMailInterface) {
    await this.transport.sendMail({
      from: this.from,
      ...data,
    });
  }
}

export { ISendMailInterface, MailSender };
