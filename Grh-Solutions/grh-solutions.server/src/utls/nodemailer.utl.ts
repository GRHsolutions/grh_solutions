import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true para 465, false para otros
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_APPPASS,
  },
});

export interface Sender {
    html: string, 
    to: string[],
    subject: string,
}

export const mailer = {
  send: async(sender: Sender) => {
    const response = await transporter.sendMail({
      from: "'Pruebbaaaaaaa'<rodriguesigmajuanpe@gmail.com>", // IMPORTANTE CAMBIAR ESTO HAHAH
      html: sender.html,
      to: sender.to,
      subject: sender.subject
    })

    return response;
  }
}