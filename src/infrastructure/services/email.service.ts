import { EmailInterface } from "./interfaces/email.interface";
import nodemailer from "nodemailer";
require("dotenv").config();

export class EmailService implements EmailInterface {
  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `Hex Api <${to}>`,
      to,
      subject,
      text: body,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

  }
}