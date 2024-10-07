const ContactPhones = require('./contact_phones.js');

import { Service } from 'typedi';
import { IContactPhonesDBApi } from './interfaces/IContactPhonesDBApi.interface';
@Service()
export default class ContactPhonesDBApi
    extends ContactPhones
    implements IContactPhonesDBApi {}
