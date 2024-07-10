const Emails = require('./emails.js');

import { Service } from 'typedi';
import { IEmailsDBApi } from './interfaces/IEmailsDBApi.interface';
@Service()
export default class EmailsDBApi extends Emails implements IEmailsDBApi {}
