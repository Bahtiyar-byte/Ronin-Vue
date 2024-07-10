const Emails = require('./emails.js');
import { Service } from 'typedi';
import type { IEmailsService } from './interfaces/IEmailsService.interface';
@Service()
export default class EmailsService extends Emails implements IEmailsService {}
