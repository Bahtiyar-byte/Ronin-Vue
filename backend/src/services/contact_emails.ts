const ContactEmails = require('./contact_emails.js');
import { Service } from 'typedi';
import type { IContactEmailsService } from './interfaces/IContactEmailsService.interface';
@Service()
export default class ContactEmailsService
    extends ContactEmails
    implements IContactEmailsService {}
