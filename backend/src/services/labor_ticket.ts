const LaborTicket = require('./labor_ticket.js');
import { Service } from 'typedi';
import type { ILaborTicketService } from './interfaces/ILaborTicketService.interface';
@Service()
export default class LaborTicketService extends LaborTicket implements ILaborTicketService {}
