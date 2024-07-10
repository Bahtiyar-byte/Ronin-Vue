const Invoices = require('./invoices.js');
import { Service } from 'typedi';
import type { IInvoicesService } from './interfaces/IInvoiceService.interface';
@Service()
export default class InvoicesService
  extends Invoices
  implements IInvoicesService {}
