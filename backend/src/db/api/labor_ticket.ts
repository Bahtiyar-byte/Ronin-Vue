const LaborTicket = require('./labor_ticket.js');

import { Service } from 'typedi';
import type { ILaborTicketDBApi } from './interfaces/ILaborTicketDBApi.interface';
@Service()
export default class LaborTicketDBApi extends LaborTicket implements ILaborTicketDBApi {}
