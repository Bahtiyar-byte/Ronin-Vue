
import type Email from '~/services/email/list/Email'

const config = require('../../config');
const nodemailer = require('nodemailer');

interface Attachment {
    filename: string
    contentType: string
    content?: Buffer
    path?: string
}

export default class EmailSender {
    private readonly email: Email

    private attachments: Attachment[] = []

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
            attachments: this.attachments
        };

        return transporter.sendMail(mailOptions);
    }

    async addAttachment(attachment: Attachment) {
        this.attachments.push(attachment)
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

