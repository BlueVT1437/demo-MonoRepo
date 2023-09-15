import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';

config();

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(message: string) {
		const parseMessage = JSON.parse(message);
		console.log('parseMessage', parseMessage);
    const { token, name, email } = parseMessage;

    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      from: process.env.MAILER_EMAIL, // override default from
      subject: 'Welcome to Nice App! Notification mail is success!',
      context: {
        // ✏️ filling curly brackets with content
        name: name,
        url: url,
      },
    });
  }
}
