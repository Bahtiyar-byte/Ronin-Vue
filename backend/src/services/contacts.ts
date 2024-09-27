const Contacts = require('./contacts.js');
import { Service } from 'typedi';
import type { IContactsService } from './interfaces/IContactsService.interface';
@Service()
export default class ContactsService
    extends Contacts
    implements IContactsService {}
