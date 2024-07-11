const Contracts = require('./contracts.js');
import { Service } from 'typedi';
import type { IContractsService } from './interfaces/IContractsService.interface';
@Service()
export default class ContractsService
  extends Contracts
  implements IContractsService {}
