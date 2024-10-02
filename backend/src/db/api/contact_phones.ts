const ContactEmails = require('./contact_emails.js');

import { Service } from 'typedi';
import { IContactPhonesDBApi } from './interfaces/IContactPhonesDBApi.interface';
@Service()
export default class ContactEmailsDBApi
    extends ContactEmails
    implements IContactPhonesDBApi {}
