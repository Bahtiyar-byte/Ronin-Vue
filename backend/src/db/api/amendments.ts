const Amendments = require('./amendments.js');

import { Service } from 'typedi';
import { IAmendmentsDBApi } from './interfaces/IAmendmentsDBApi.interface';
@Service()
export default class AmendmentsDBApi
  extends Amendments
  implements IAmendmentsDBApi {}
