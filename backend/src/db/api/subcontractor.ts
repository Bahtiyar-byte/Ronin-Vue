const SubContractor = require('./subcontractor.js');

import { Service } from 'typedi';
import type { ISubContractorDBApi } from './interfaces/ISubContractorDBApi.interface';
@Service()
export default class SubContractorDBApi extends SubContractor implements ISubContractorDBApi {}
