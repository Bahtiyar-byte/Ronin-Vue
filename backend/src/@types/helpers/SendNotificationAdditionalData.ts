export default interface SendNotificationAdditionalData {
    emailTo: string
    subject: string
    message: string
    attachments: Express.Multer.File[]
}
