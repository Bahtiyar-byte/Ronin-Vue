export default interface SendEmailHandlerAdditionalData {
  emailTo: string
  subject: string
  message: string
  attachments: Blob[]
  notifyContact: boolean
}
