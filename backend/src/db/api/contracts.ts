const Contracts = require('./contracts.js');

import { Service } from 'typedi';
import { IContractsDBApi } from './interfaces/IContractsDBApi.interface';
@Service()
export default class ContractsDBApi
  extends Contracts
  implements IContractsDBApi {}
