import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ca5e8a4f7469a1",
      pass: "9ba5b02a0bb5d2",
    },
  });

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({subject, body}: SendMailData) {
    await transport.sendMail({
      from: "Feedback Team <hello@feedback.com>",
      to: "Nuno Ferraz <108nunomiguelferraz@gmail.com>",
      subject,
      html: body,
    });
  }
}
