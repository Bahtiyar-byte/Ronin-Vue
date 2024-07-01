
import type Email from '~/services/email/list/Email'

const config = require('../../config');
const nodemailer = require('nodemailer');

export default class EmailSender {
    private readonly email: Email

    constructor(email: Email) {
        this.email = email;
    }

    async send() {
        const htmlContent = await this.email.html();

        const transporter = nodemailer.createTransport(this.transportConfig);

        const mailOptions = {
            from: this.from,
            to: this.email.to,
            subject: this.email.subject,
            html: htmlContent,
        };

        return transporter.sendMail(mailOptions);
    }

    static get isConfigured() {
        return !!config.email?.auth?.pass && !!config.email?.auth?.user;
    }

    get transportConfig() {
        return config.email;
    }

    get from() {
        return config.email.from;
    }
}

