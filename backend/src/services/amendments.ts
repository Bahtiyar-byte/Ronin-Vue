const Amendments = require('./amendments.js');
import { Service } from 'typedi';
import type { IAmendmentsService } from './interfaces/IAmendmentsService.interface';
@Service()
export default class AmendmentsService
  extends Amendments
  implements IAmendmentsService {}
