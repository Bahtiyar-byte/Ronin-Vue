const ContactPhones = require('./contact_phones.js');
import { Service } from 'typedi';
import type { IContactPhonesService } from './interfaces/IContactPhonesService.interface';
@Service()
export default class ContactPhonesService
    extends ContactPhones
    implements IContactPhonesService {}
