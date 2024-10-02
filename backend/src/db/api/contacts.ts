const Contacts = require('./contacts.js');

import { Service } from 'typedi';
import { IContactsDBApi } from './interfaces/IContactsDBApi.interface';
@Service()
export default class ContactsDBApi
    extends Contacts
    implements IContactsDBApi {}
