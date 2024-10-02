const SubContractor = require('./subcontractor');
import { Service } from 'typedi';
import type { ISubContractorService } from './interfaces/ISubContractorService.interface.ts';
@Service()
export default class SubContractorService extends SubContractor implements ISubContractorService {}
