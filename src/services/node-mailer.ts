import { EFormType } from "@app/enums";
import nodeMailer from "nodemailer";

class MailService {
  private transporter: nodeMailer.Transporter;

  constructor() {
    this.transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.TRANSPORTER_USER,
        pass: process.env.TRANSPORTER_PASS,
      },
    });
  }

  async sendMail(data: {
    name: string;
    email: string;
    phoneNumber?: number;
    company?: string;
    type: EFormType;
  }) {
    const message = {
      from: process.env.FROM_GMAIL_EMAIL_ADDRESS,
      to: process.env.TO_GMAIL_EMAIL_ADDRESS,
      subject: "Subscribe Notification To Marketing Department",
      html: `
        <h4> ${data.name} was subscribed!</h4>
        <h4> Plan: ${data.type}</h4>
        <h4> Email: ${data.email}</h4>
        ${
          data?.phoneNumber
            ? "<h4> Phone Number: " + data?.phoneNumber + "</h4>"
            : ""
        }
        ${data?.company ? "<h4> Company: " + data?.company + "</h4>" : ""}
      `,
    };

    try {
      await this.transporter.sendMail(message);
    } catch (error) {
      console.log(error);
    }
  }
}

export const mailService = new MailService();
