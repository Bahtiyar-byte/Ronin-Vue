const Invoices = require('./invoices.js');

import { Service } from 'typedi';
import { IInvoicesDBApi } from './interfaces/IInvoicesDBApi.interface';
@Service()
export default class InvoicesDBApi extends Invoices implements IInvoicesDBApi {}
