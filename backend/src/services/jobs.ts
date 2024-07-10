const Jobs = require('./jobs.js');
import { Service } from 'typedi';
import type { IJobsService } from './interfaces/IJobsService.interface';
@Service()
export default class JobsService extends Jobs implements IJobsService {}
