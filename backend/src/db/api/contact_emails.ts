const ContactEmails = require('./contact_emails.js');

import { Service } from 'typedi';
import { IContactEmailsDBApi } from './interfaces/IContactEmailsDBApi.interface';
@Service()
export default class ContactEmailsDBApi
    extends ContactEmails
    implements IContactEmailsDBApi {}
